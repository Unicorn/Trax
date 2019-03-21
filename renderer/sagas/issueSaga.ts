import { put, call, takeLatest, ForkEffect, PutEffect, CallEffect } from 'redux-saga/effects'
import * as IssueModel from 'models/issue'
import { octokit, UpdateIssueLaneAction } from 'models/github'
import { createAlert } from 'controllers/alertController'
import { updateIssue } from 'controllers/issueController'
import { LANES, Lane } from 'config/constants'

function* watchUpdateIssueLane(action: UpdateIssueLaneAction): Iterable<CallEffect | PutEffect> {
  const { payload, to } = action
  const [owner, repo] = payload.ident.split('/')
  const newIssue = { ...payload }

  try {
    const labels = payload.labels.filter(l => !LANES.includes(l.name as Lane)).map(l => l.name)
    labels.push(to)

    const newLabels = yield call(octokit.issues.replaceLabels, { owner, repo, number: payload.number, labels })
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
  yield takeLatest(IssueModel.ISSUE.UPDATE_LANE, watchUpdateIssueLane)
}
