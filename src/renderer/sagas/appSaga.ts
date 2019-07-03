import { toArray, createAlert } from 'horseshoes'
import { takeLatest, put, call, all, ForkEffect, PutEffect, CallEffect, AllEffect } from 'redux-saga/effects'
import { RehydrateAction } from 'redux-persist'
import { persistor } from '@/controllers/reduxController'
import { APP } from '@/models/app'
import { requestProfile } from '@/controllers/profileController'
import { stopTimer, resetTimer } from '@/controllers/timerController'
import { RootState } from '@/models/app'
import { Timer } from '@/models/timer'

function* watchPersist({ payload }: RehydrateAction<RootState>): Iterable<PutEffect | AllEffect<PutEffect>> {
  if (!payload || !payload.auth || !payload.auth.accessToken) return
  if (!payload.profile || payload.profile.login === 'octocat') yield put(requestProfile())

  const runningTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && timer.startedAt)
  const invalidTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && !timer.startedAt)

  yield all(runningTimers.map(timer => put(stopTimer(timer))))
  yield all(invalidTimers.map(timer => put(resetTimer(timer))))
}

function* watchAppReset(): Iterable<CallEffect | PutEffect> {
  try {
    yield call(persistor.purge)
    yield put({ type: 'RESET' })
    yield put(
      createAlert({
        key: 'appResetSuccess',
        status: 'success',
        message: 'Successfully flushed the application cache',
        dismissable: true,
        dismissAfter: 3000
      })
    )
  } catch (e) {
    yield put(
      createAlert({
        key: 'appResetError',
        status: 'error',
        message: `Could not flush cache: ${e.message}`,
        dismissable: true,
        dismissAfter: 3000
      })
    )
  }
}

export default function* appSaga(): Iterable<ForkEffect> {
  yield takeLatest('persist/REHYDRATE', watchPersist)
  yield takeLatest(APP.RESET, watchAppReset)
}
