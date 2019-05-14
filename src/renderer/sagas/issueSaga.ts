import { put, call, takeEvery, ForkEffect, PutEffect, CallEffect } from 'redux-saga/effects'
import * as IssueModel from '@/models/issue'
import { octokit, UpdateIssueLaneAction } from '@/models/github'
import { createAlert } from '@/controllers/alertController'
import { createIssue, updateIssue } from '@/controllers/issueController'
import { LANES, Lane } from '@/config/constants'

function* watchCreateIssueRequest(action: IssueModel.CreateIssueAction): Iterable<CallEffect | PutEffect> {
  try {
    const issue = yield call(octokit.issues.create, action.payload)

    yield put(createIssue(IssueModel.normalizeIssue(issue.data)))
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

function* watchUpdateIssueLane(action: UpdateIssueLaneAction): Iterable<CallEffect | PutEffect> {
  const { payload, to } = action
  const [owner, repo] = payload.ident.split('/')
  const newIssue = { ...payload }

  try {
    const labels = payload.labels.filter(l => !LANES.includes(l.name as Lane)).map(l => l.name)
    labels.push(to)

    const newLabels = yield call(octokit.issues.replaceLabels, { owner, repo, issue_number: payload.number, labels })
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

export default function* issueSaga(): Iterable<ForkEffect> {
  yield takeEvery(IssueModel.ISSUE.CREATE_REQUEST, watchCreateIssueRequest)
  yield takeEvery(IssueModel.ISSUE.UPDATE_LANE, watchUpdateIssueLane)
}
