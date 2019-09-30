import { put, all, takeEvery } from 'redux-saga/effects'
import { call, normalizePayload } from 'horseshoes'
import { updateTrack } from '@/controllers/trackController'
import { updateUsers } from '@/controllers/userController'
import { updateIssues } from '@/controllers/issueController'
import { TrackAction } from '@/models/track'
import { User } from '@/models/user'
import { Issue } from '@/models/issue'
import { TRACK } from '@/models/track'
import { LABELS } from '@/config/constants'
import { octokit, getIssues, receivedIssues } from '@/models/github'
import { SagaIterator } from 'redux-saga'

function* watchReloadTrack(action: TrackAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  const [owner, repo] = payload.ident.split('/')

  try {
    yield put(getIssues())
    const users = yield* call(octokit.issues.listAssignees, { owner, repo, per_page: 100 })
    const issues = yield* call(octokit.issues.listForRepo, { owner, repo, per_page: 100 })

    if (!issues || !users) return

    console.log("watchReloadTrack [1]", normalizePayload, users.data, issues.data)

    const normalizedUsers = users.data.map(user => normalizePayload({ ...user, ident: payload.ident }) as User)
    const normalizedIssues = issues.data.map(issue => normalizePayload({ ...issue, ident: payload.ident }) as Issue)

    console.log("watchReloadTrack [2]", normalizePayload, normalizedUsers, normalizedIssues)

    yield put(updateUsers(normalizedUsers))
    yield put(updateIssues(normalizedIssues))

    yield put(
      updateTrack({
        ...payload,
        userIds: normalizedUsers.map(user => user.nodeId),
        issueIds: normalizedIssues.map(issue => issue.nodeId)
      })
    )

    yield put(receivedIssues())
  } catch (e) {
    console.log('Ignoring errors for create tracks:', e.message)
  }
}

function* watchCreateTrack(action: TrackAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  try {
    const [owner, repo] = payload.ident.split('/')

    yield all(
      Object.keys(LABELS).map(key => {
        return octokit.issues.createLabel({ owner, repo, name: LABELS[key].name, color: LABELS[key].color }) as any
      })
    )

    yield* call(watchReloadTrack, action)
  } catch (e) {
    console.log('error', e.response)
  }
}

export default function* trackSaga(): SagaIterator {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
  yield takeEvery(TRACK.RELOAD, watchReloadTrack)
}
