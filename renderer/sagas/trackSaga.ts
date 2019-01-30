import { fork, takeEvery } from 'redux-saga/effects'
import { fetchCreateLabel } from 'services/githubService'
import { TrackAction } from 'models/track'
import { TRACK } from 'models/track'
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
}

export default function* trackSaga() {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
}