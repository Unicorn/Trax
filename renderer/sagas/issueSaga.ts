import { put, call, fork, takeLatest } from 'redux-saga/effects'
import { fetchIssues, fetchIssueCreate, fetchIssueUpdate } from 'services/githubService'
import { createAlert } from 'controllers/alertController'
import { issuesList, receiveIssue } from 'controllers/issueController'
import { issuesWithoutLanes } from 'helpers/issueHelper'
import { ISSUE, IssuesAction, Issue, CreateIssueRequest } from 'models/issue'
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

  yield put(receiveIssue(newIssue))
}

function* watchIssueCreate(action: IssuesAction) {
  if (!action.payload || !action.ident) return

  const { payload, ident } = action
  const issue = payload as CreateIssueRequest
  const [owner, repo]: any = ident.split('/')

  const request = {
    params: { owner, repo },
    body: issue
  }

  const newIssue = yield call(fetchIssueCreate, request)

  console.log("NEW ISSUES VALUE", newIssue)

  yield put(createAlert({
    type: 'success',
    dismissable: true,
    message:  "Successfully posted your issue"
  }))

  yield put(receiveIssue(newIssue))
}

export default function* issueSaga() {
  yield takeLatest(ISSUE.CREATE.REQUEST, watchIssueCreate)
  yield takeLatest(ISSUE.LIST.REQUEST, watchIssuesRequest)
  yield takeLatest(ISSUE.UPDATE.REQUEST, watchIssueSwitchLanes)
}
