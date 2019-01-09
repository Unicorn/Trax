import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { fetchIssues, fetchIssueUpdate } from 'services/githubService'
import { issuesList, receiveIssue } from 'controllers/issueController'
import { issuesWithoutLanes } from 'helpers/issueHelper'
import { ISSUE, IssuesAction, Issue } from 'models/issue'
import { SWIMLANES } from 'config/constants'

function* watchIssuesRequest(action: IssuesAction) {
  if (!action.ident) return

  const { ident } = action
  const [owner, repo]: any = ident.split('/')
  const request = { params: { owner, repo, ident } }
  const issues = yield call(fetchIssues, request)

  yield issuesWithoutLanes(issues).map(({ labels, number }: Issue) => {
    let req = {
      params: { owner, repo, ident, number },
      body: {
        labels: [...labels, SWIMLANES.backlog.name]
      }
    }

    return fork(fetchIssueUpdate, req)
  })

  const issuesAgain = yield call(fetchIssues, request)

  yield put(issuesList.success(issuesAgain))
}

function* watchIssueSwitchLanes(action: IssuesAction) {
  if (!action.payload || !action.from || !action.to) return

  const { payload, from, to } = action
  const issue = payload as Issue
  const [owner, repo]: any = issue.ident.split('/')
  const rawLabels = issue.labels
  const labels = rawLabels.filter(l => l.name !== from).map(l => l.name)
  labels.push(to)

  const request = {
    params: { owner, repo, number: issue.number },
    body: { labels }
  }
  const newIssue = yield call(fetchIssueUpdate, request)

  console.log("newIssue", newIssue)

  yield put(receiveIssue(newIssue))
}

export default function* issueSaga() {
  yield takeEvery(ISSUE.LIST.REQUEST, watchIssuesRequest)
  yield takeEvery(ISSUE.UPDATE.REQUEST, watchIssueSwitchLanes)
}
