import { SagaIterator } from 'redux-saga'
import { put, call, takeLatest, ForkEffect } from 'redux-saga/effects'
import { normalizePayload } from 'horseshoes'
import { receiveProfile } from '@/controllers/profileController'
import { PROFILE, Profile } from '@/models/profile'
import { octokit } from '@/models/github'

function* watchProfileRequest(): SagaIterator {
  const profile = yield call(octokit.users.getAuthenticated)
  yield put(receiveProfile(normalizePayload(profile.data) as Profile))
}

export default function* userSaga(): Iterable<ForkEffect> {
  yield takeLatest(PROFILE.REQUEST, watchProfileRequest)
}
