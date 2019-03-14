import { keys } from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import { requestProfile } from 'controllers/profileController'
import { issuesList } from 'controllers/issueController'

function* watchPersist(action: any) {
  if (!action.payload)
    return

  const { payload: { auth, profile, tracks} } = action

  if (!auth || !auth.accessToken)
    return

  if (!profile || profile.login === "octocat")
    yield put(requestProfile())

  if (tracks && keys(tracks).length > 0)
    yield keys(tracks).map(key => put(issuesList.request(tracks[key].ident)))
}

export default function* persistSaga() {
  yield takeEvery('persist/REHYDRATE', watchPersist)
}
