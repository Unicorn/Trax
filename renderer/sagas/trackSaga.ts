import { put, all, call, takeLatest } from 'redux-saga/effects'
import { RequestOptions } from '@octokit/rest'
import { fetchCreateLabel, fetchRepoUsers, fetchRepoIssues } from 'services/githubService'
import { updateTrack } from 'controllers/trackController'
import { updateUsers } from 'controllers/userController'
import { createAlert } from 'controllers/alertController'
import { updateIssues } from 'controllers/issueController'
import { normalizePayload } from 'models/app'
import { TrackAction } from 'models/track'
import { User } from 'models/user'
import { Issue } from 'models/issue'
import { TRACK } from 'models/track'
import { LABELS } from 'config/constants'
import { octokit } from 'models/github'

const labelRequests = (): RequestOptions[] => {
  const requests: RequestOptions[] = []

  Object.keys(LABELS).forEach(key => {
    requests.push({
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.symmetra-preview+json',
      },
      body: {
        name: LABELS[key].name,
        color: LABELS[key].color
      }
    })
  })

  return requests
}

function* watchCreateTrack(action: TrackAction) {
  const [owner, repo] = action.payload.ident.split('/')

  try {
    yield all(labelRequests().map(r => call(fetchCreateLabel, action.payload.ident, r)))
    yield call(watchReloadTrack, action)
  }
  catch (e) {
    yield put(createAlert({
      key: 'watchCreateTrackError',
      status: 'error',
      message: `Error creating track: ${e.message}`,
      dismissable: true
    }))
  }
}

function* watchReloadTrack({ payload }: TrackAction) {
  const [owner, repo] = payload.key.split('/')

  try {
    const users = yield call(octokit.issues.listAssignees, { owner, repo, per_page: 100 })
    const issues = yield call(fetchRepoIssues, payload.ident)

    yield put(updateUsers(normalizePayload(users.data)))
    yield put(updateIssues(normalizePayload(issues.data)))

    yield put(updateTrack({
      ...payload,
      userIds: users.map((user: User) => user.nodeId),
      issueIds: issues.map((issue: Issue) => issue.nodeId)
    }))
  }
  catch (e) {
    yield put(createAlert({
      key: 'watchReloadTrackError',
      status: 'error',
      message: `Error reloading track: ${e.message}`,
      dismissable: true
    }))
  }
}

export default function* trackSaga() {
  yield takeLatest(TRACK.CREATE, watchCreateTrack)
  // yield takeLatest(TRACK.RELOAD, watchReloadTrack)
}
