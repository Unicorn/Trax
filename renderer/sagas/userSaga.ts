import { put, call, takeLatest } from 'redux-saga/effects'
import { receiveProfile } from 'controllers/profileController'
import { normalizePayload } from 'models/app'
import { PROFILE, ProfileAction } from 'models/profile'
import { octokit } from 'models/github'

function* watchProfileRequest(_action: ProfileAction) {
  const profile = yield call(octokit.users.getAuthenticated)
  yield put(receiveProfile(normalizePayload(profile.data)))
}

export default function* userSaga() {
  yield takeLatest(PROFILE.REQUEST, watchProfileRequest)
}
