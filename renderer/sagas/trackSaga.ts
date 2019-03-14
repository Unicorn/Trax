import { put, all, call, takeEvery } from 'redux-saga/effects'
import { fetchCreateLabel, fetchRepoUsers, fetchRepoIssues } from 'services/githubService'
import { updateTrack } from 'controllers/trackController'
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

  const [owner, repo]: any = action.payload.ident.split('/')
  const labelRequests = getLabels()
  const users = yield call(fetchRepoUsers, action.payload.ident)
  const issues = yield call(fetchRepoIssues, action.payload.ident)

  yield all(labelRequests.map((r: any) => call(fetchCreateLabel, { owner, repo }, r)))
  yield put(updateTrack({ ...action.payload, users, issues }))
}

function* watchReloadTrack(action: TrackAction) {
  if (!action.payload) return

  const users = yield call(fetchRepoUsers, action.payload.ident)
  const issues = yield call(fetchRepoIssues, action.payload.ident)

  yield put(updateTrack({ ...action.payload, users, issues }))
}

export default function* trackSaga() {
  yield takeEvery(TRACK.CREATE, watchCreateTrack)
  yield takeEvery(TRACK.RELOAD, watchReloadTrack)
}
