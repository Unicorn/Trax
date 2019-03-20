import { put, all, call, takeLatest } from 'redux-saga/effects'
import { fetchCreateLabel, fetchRepoUsers, fetchRepoIssues } from 'services/githubService'
import { updateTrack } from 'controllers/trackController'
import { TrackAction } from 'models/track'
import { User } from 'models/user'
import { Issue } from 'models/issue'
import { TRACK } from 'models/track'
import { LABELS } from 'config/constants'
import { octokit } from 'models/github'

const getLabels = () => {
  const requests: any = []

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

function* watchCreateTrack({ payload }: TrackAction) {
  if (!payload) return

  const [owner, repo] = payload.ident.split('/')
  const labelRequests = getLabels()
  const users = yield call(fetchRepoUsers, payload.ident)
  const issues = yield call(fetchRepoIssues, payload.ident)

  const assignees = yield call(octokit.issues.listAssignees, { owner, repo, per_page: 100 })

  return console.log('assignees in watchCreateTrack', assignees)

  yield all(labelRequests.map((r: any) => call(fetchCreateLabel, payload.ident, r)))

  yield put(updateTrack({
    ...payload,
    userIds: users.map((user: User) => user.nodeId),
    issueIds: issues.map((issue: Issue) => issue.nodeId)
  }))
}

function* watchReloadTrack({ payload }: TrackAction) {
  if (!payload) return

  const users = yield call(fetchRepoUsers, payload.ident)
  const issues = yield call(fetchRepoIssues, payload.ident)

  yield put(updateTrack({
    ...payload,
    userIds: users.map((user: User) => user.nodeId),
    issueIds: issues.map((issue: Issue) => issue.nodeId)
  }))
}

export default function* trackSaga() {
  yield takeLatest(TRACK.CREATE, watchCreateTrack)
  yield takeLatest(TRACK.RELOAD, watchReloadTrack)
}
