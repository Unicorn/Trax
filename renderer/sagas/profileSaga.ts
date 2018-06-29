import { put, call, takeEvery } from 'redux-saga/effects'
import { fetchProfile } from 'services/githubService'
import { receiveProfile } from 'controllers/profileController'
import { PROFILE, ProfileAction } from 'models/profile'

function* watchProfileRequest(_action: ProfileAction) {
  const profile = yield call(fetchProfile, 'user')

  console.log('watchProfileRequest', profile)

  yield put(receiveProfile(profile))
}


export default function* profileSaga() {
  yield takeEvery(PROFILE.REQUEST, watchProfileRequest)
}
