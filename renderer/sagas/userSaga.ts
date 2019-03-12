import { put, call, takeEvery } from 'redux-saga/effects'
import { fetchProfile } from 'services/githubService'
import { receiveProfile } from 'controllers/profileController'
import { PROFILE, ProfileAction } from 'models/profile'

function* watchProfileRequest(_action: ProfileAction) {
  const profile = yield call(fetchProfile)
  yield put(receiveProfile(profile))
}

export default function* userSaga() {
  yield takeEvery(PROFILE.REQUEST, watchProfileRequest)
}
