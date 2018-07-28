import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { fetchIssues, fetchIssueUpdate } from 'services/githubService'
import { receiveIssues } from 'controllers/issueController'
import { issuesWithoutLanes } from 'helpers/issueHelper'
import { ISSUE, IssuesAction, Issue } from 'models/issue'
import { SWIMLANES } from 'config/constants'

function* watchIssuesRequest(action: IssuesAction) {
  if (!action.ident) return

  const { ident } = action
  const [owner, repo]: any = ident.split('/')
  const params = { owner, repo, ident }
  const request = {
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
    params
  }
  const issues = yield call(fetchIssues, request)
  console.log('issues', issues)

  const backlogIssues = issuesWithoutLanes(issues)

  console.log('backlogIssues', backlogIssues)

  yield backlogIssues.map((issue: Issue) => {
    let request2 = {
      ...request,
      method: 'PATCH',
      body: {
        labels: [...issue.labels, SWIMLANES.backlog.name]
      },
      params: { ...params, number: issue.number }
    }

    return fork(fetchIssueUpdate, request2)
  })

  const issuesAgain = yield call(fetchIssues, request)

  console.log("issuesAgain", issuesAgain)

  yield put(receiveIssues(issuesAgain))
}


export default function* issueSaga() {
  yield takeEvery(ISSUE.REQUEST, watchIssuesRequest)
}
