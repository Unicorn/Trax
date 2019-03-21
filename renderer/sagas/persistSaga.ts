import { takeLatest, put, ForkEffect, PutEffect } from 'redux-saga/effects'
import { RehydrateAction } from 'redux-persist'
import { requestProfile } from 'controllers/profileController'
import { AppState } from 'models/app'

function* watchPersist({ payload }: RehydrateAction<AppState>): Iterable<PutEffect> {
  if (!payload || !payload.auth || !payload.auth.accessToken) return
  if (!payload.profile || payload.profile.login === 'octocat') yield put(requestProfile())
}

export default function* persistSaga(): Iterable<ForkEffect> {
  yield takeLatest('persist/REHYDRATE', watchPersist)
}
