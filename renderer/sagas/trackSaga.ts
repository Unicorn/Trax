import { fork, call, takeEvery } from 'redux-saga/effects'
import { fetchCreateLabel, fetchUnassignedIssues, fetchIssueUpdate } from 'services/githubService'
import { TrackAction } from 'models/track'
import { TRACK } from 'models/track'
import { Issue } from 'models/issue'
import { filterIssuesWithoutLanes } from 'helpers/issueHelper'
import { SWIMLANES } from 'config/constants'

const getLabels = () => {
  const { backlog, started, review, complete } = SWIMLANES
  const labels = [backlog, started, review, complete]
  const requests: any = []

  labels.forEach(label => {
    requests.push({
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.symmetra-preview+json',
      },
      body: {
        name: label.name,
        color: label.color.replace('#', '')
      }
    })
  })

  return requests
}

function* watchCreateTrack(action: TrackAction) {
  if (!action.payload) return

  const { payload } = action
  const [owner, repo]: any = payload.ident.split('/')

  yield getLabels().map((r: any) => fork(fetchCreateLabel, { owner, repo }, r))

  // Get Unassigned Issues and add to backlog
  let request = {
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json',
    }
  }
  const issues = yield call(fetchUnassignedIssues, { owner, repo }, request)
  const backlogIssues = filterIssuesWithoutLanes(issues)

  console.log('backlog', backlogIssues)

  yield backlogIssues.map((issue: Issue) => {
    let r = {
      ...request,
      method: 'PATCH',
      body: {
        labels: [...issue.labels, SWIMLANES.backlog.name]
      }
    }

    return fork(fetchIssueUpdate, { owner, repo, number: issue.number }, r)
  })
}

export default function* trackSaga() {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
}
