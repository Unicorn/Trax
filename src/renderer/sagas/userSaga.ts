import { put, call, takeLatest, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects'
import { receiveProfile } from '@/controllers/profileController'
import { normalizePayload } from '@/models/app'
import { PROFILE } from '@/models/profile'
import { octokit } from '@/models/github'

function* watchProfileRequest(): Iterable<CallEffect | PutEffect> {
  const profile = yield call(octokit.users.getAuthenticated)
  yield put(receiveProfile(normalizePayload(profile.data)))
}

export default function* userSaga(): Iterable<ForkEffect> {
  yield takeLatest(PROFILE.REQUEST, watchProfileRequest)
}
