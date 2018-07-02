import { takeEvery, put } from 'redux-saga/effects'
import { requestProfile } from 'controllers/profileController'

function* watchPersist(action: any) {
  const { payload } = action

  if (!payload || !payload.auth || !payload.auth.accessToken)
    return

  if (!payload.profile || payload.profile.login === "octocat")
    yield put(requestProfile())

  if (!payload.issues)
    yield put (requestIssues())
}

export default function* persistSaga() {
  yield takeEvery('persist/REHYDRATE', watchPersist)
}
