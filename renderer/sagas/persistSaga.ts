import { put, takeEvery } from 'redux-saga/effects'
import { requestGithubProfile } from 'controllers/userController'

function* watchPersist(action: any) {
  const { payload } = action
  const code = payload.user.githubAuth.code

  // If we don't already have a cached user profile
  if ((payload.user && payload.user.githubAuth) && !payload.user.githubProfile)
    yield put(requestGithubProfile({ code }))
}

export default function* persistSaga() {
  yield takeEvery('persist/REHYDRATE', watchPersist)
}
