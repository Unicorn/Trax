import { all, call, takeEvery } from 'redux-saga/effects'
import { fetchCreateLabel } from 'services/githubService'
import { TrackAction } from 'models/track'
import { TRACK } from 'models/track'
import { LABELS } from 'config/constants'

const getLabels = () => {
  const requests: any = []

  Object.keys(LABELS).forEach(key => {
    requests.push({
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github.symmetra-preview+json',
      },
      body: {
        name: LABELS[key].name,
        color: LABELS[key].color.replace('#', '')
      }
    })
  })

  return requests
}

function* watchCreateTrack(action: TrackAction) {
  if (!action.payload) return

  const { payload } = action
  const [owner, repo]: any = payload.ident.split('/')
  const labelRequests = getLabels()

  yield all(labelRequests.map((r: any) => call(fetchCreateLabel, { owner, repo }, r)))
}

export default function* trackSaga() {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
}
