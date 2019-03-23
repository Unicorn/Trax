import { put, all, call, takeEvery, ForkEffect, CallEffect, PutEffect, AllEffect } from 'redux-saga/effects'

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

function* watchReloadTrack(action: TrackAction): Iterable<CallEffect | PutEffect> {
  const { payload } = action

  if (!payload) return

  const [owner, repo] = payload.ident.split('/')

  try {
    const users = yield call(octokit.issues.listAssignees, { owner, repo, per_page: 100 })
    const issues = yield call(octokit.issues.listForRepo, { owner, repo, per_page: 100 })
    const normalizedUsers = users.data.map((user: User) => normalizePayload({ ...user, ident: payload.ident }))
    const normalizedIssues = issues.data.map((issue: Issue) => normalizePayload({ ...issue, ident: payload.ident }))

    yield put(updateUsers(normalizedUsers))
    yield put(updateIssues(normalizedIssues))

    yield put(
      updateTrack({
        ...payload,
        userIds: normalizedUsers.map((user: User) => user.nodeId),
        issueIds: normalizedIssues.map((issue: Issue) => issue.nodeId)
      })
    )
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchReloadTrackError',
        status: 'error',
        message: `Error reloading track: ${e.message}`,
        dismissable: true
      })
    )
  }
}

function* watchCreateTrack(action: TrackAction): Iterable<AllEffect<CallEffect> | CallEffect | PutEffect> {
  const { payload } = action

  if (!payload) return

  const [owner, repo] = payload.ident.split('/')

  try {
    yield all(
      Object.keys(LABELS).map(key => {
        return call(octokit.issues.createLabel, { owner, repo, name: LABELS[key].name, color: LABELS[key].color })
      })
    )
    yield call(watchReloadTrack, action)
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchCreateTrackError',
        status: 'error',
        message: `Error creating track: ${e.message}`,
        dismissable: true
      })
    )
  }
}

export default function* trackSaga(): Iterable<ForkEffect> {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
  yield takeEvery(TRACK.RELOAD, watchReloadTrack)
}
