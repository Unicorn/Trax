import { SagaIterator } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { call, createAlert } from 'horseshoes'
import { normalizeIssue, CreateIssueAction, ISSUE } from '@/models/issue'
import { octokit, UpdateIssueLaneAction } from '@/models/github'
import { createIssue, updateIssue } from '@/controllers/issueController'
import { laneTypes, LaneTypes } from '@/models/lane'

function* watchCreateIssueRequest(action: CreateIssueAction): SagaIterator {
  try {
    const issue = yield* call(octokit.issues.create, action.payload)

    yield put(createIssue(normalizeIssue(issue.data)))
    yield put(
      createAlert({
        key: 'watchCreateIssueRequestSuccess',
        status: 'success',
        message: 'Successfully posted your issue',
        dismissable: true,
        dismissAfter: 3000
      })
    )
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchCreateIssueRequestError',
        status: 'error',
        message: `Error creating issue: ${e.message}`,
        dismissable: true
      })
    )
  }
}

function* watchUpdateIssueLane(action: UpdateIssueLaneAction): SagaIterator {
  const { payload, to } = action
  const [owner, repo] = payload.ident.split('/')
  const newIssue = { ...payload }

  try {
    const labels = payload.labels.filter(l => !laneTypes.includes(l.name as LaneTypes)).map(l => l.name)
    labels.push(to)

    const newLabels = yield* call(octokit.issues.replaceLabels, { owner, repo, issue_number: payload.number, labels })
    newIssue.labels = newLabels.data
    newIssue.lane = to
    yield put(updateIssue(newIssue))
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchUpdateIssueLaneError',
        status: 'error',
        message: `Error switching lanes: ${e.message}`,
        dismissable: true
      })
    )
  }
}

export default function* issueSaga(): SagaIterator {
  yield takeEvery(ISSUE.CREATE_REQUEST, watchCreateIssueRequest)
  yield takeEvery(ISSUE.UPDATE_LANE, watchUpdateIssueLane)
}
