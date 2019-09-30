import { SagaIterator } from 'redux-saga'
import { takeLatest, put, all } from 'redux-saga/effects'
import { toArray, createAlert, call } from 'horseshoes'
import { RehydrateAction } from 'redux-persist'
import { persistor } from '@/controllers/reduxController'
import { APP, RootState } from '@/models/app'
import { requestProfile } from '@/controllers/profileController'
import { stopTimer, resetTimer } from '@/controllers/timerController'
import { Timer } from '@/models/timer'

function* watchPersist(action: RehydrateAction): SagaIterator {
  const payload = action.payload as RootState
  if (!payload || !payload.auth || !payload.auth.accessToken) return
  if (!payload.profile || payload.profile.login === 'octocat') yield put(requestProfile())

  const runningTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && timer.startedAt)
  const invalidTimers = (toArray(payload.timers) as Timer[]).filter(timer => timer.isRunning && !timer.startedAt)

  yield all(runningTimers.map(timer => put(stopTimer(timer))))
  yield all(invalidTimers.map(timer => put(resetTimer(timer))))
}

function* watchAppReset(): SagaIterator {
  try {
    yield* call(persistor.purge)
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

export default function* appSaga(): SagaIterator {
  yield takeLatest('persist/REHYDRATE', watchPersist)
  yield takeLatest(APP.RESET, watchAppReset)
}
