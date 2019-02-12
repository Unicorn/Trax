import { takeEvery, put } from 'redux-saga/effects'
import { requestProfile } from 'controllers/profileController'
import { issuesList } from 'controllers/issueController'
import { Track } from 'models/track'

function* watchPersist(action: any) {
  if (!action.payload)
    return

  const { payload: { auth, profile, tracks} } = action

  if (!auth || !auth.accessToken)
    return

  if (!profile || profile.login === "octocat")
    yield put(requestProfile())

  if (tracks && tracks.length > 0)
    yield tracks.map((t: Track) => put(issuesList.request(t.ident)))
}

export default function* persistSaga() {
  yield takeEvery('persist/REHYDRATE', watchPersist)
}
