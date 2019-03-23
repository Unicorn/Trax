import { takeLatest, put, all, ForkEffect, PutEffect, AllEffect } from 'redux-saga/effects'
import { RehydrateAction } from 'redux-persist'
import { toArray } from 'models/app'
import { requestProfile } from 'controllers/profileController'
import { restartTimer, resetTimer } from 'controllers/timerController'
import { AppState } from 'models/app'
import { Timer } from 'models/timer'

function* watchPersist({ payload }: RehydrateAction<AppState>): Iterable<PutEffect | AllEffect<PutEffect>> {
  if (!payload || !payload.auth || !payload.auth.accessToken) return
  if (!payload.profile || payload.profile.login === 'octocat') yield put(requestProfile())

  const runningTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && timer.startedAt)
  const invalidTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && !timer.startedAt)

  yield all(runningTimers.map(timer => put(restartTimer(timer))))
  yield all(invalidTimers.map(timer => put(resetTimer(timer))))
}

export default function* persistSaga(): Iterable<ForkEffect> {
  yield takeLatest('persist/REHYDRATE', watchPersist)
}
