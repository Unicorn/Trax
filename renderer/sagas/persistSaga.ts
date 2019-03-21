import { takeLatest, put } from 'redux-saga/effects'
import { requestProfile } from 'controllers/profileController'

function* watchPersist(action: any) {
  if (!action.payload) return

  const {
    payload: { auth, profile }
  } = action

  if (!auth || !auth.accessToken) return

  if (!profile || profile.login === 'octocat') yield put(requestProfile())
}

export default function* persistSaga() {
  yield takeLatest('persist/REHYDRATE', watchPersist)
}
