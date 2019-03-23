import { select, all, put, call, race, take, takeLatest, ForkEffect, AllEffect, SelectEffect, PutEffect, RaceEffect, TakeEffect, CallEffect } from 'redux-saga/effects'
import { AppState, toArray } from 'models/app'
import { stopTimer, tickTimer } from 'controllers/timerController'
import { TIMER, Timer, TimerAction } from 'models/timer'

// wait :: Number -> Promise
const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })

function* watchTimers({ payload }: TimerAction): Iterable<RaceEffect<TakeEffect | CallEffect> | PutEffect> {
  // Listen for a TIMER.STOP action, otherwise start tickin!
  while (true) {
    const currentTimer = yield race({
      stopped: take((action: any) => {
        console.log("take action", action)
        return action.type === TIMER.STOP && action.payload.key === payload.key
      }),
      tick: call(wait, 1000)
    })

    if (!currentTimer.stopped) yield put(tickTimer(payload))
    else break
  }
}

function* watchStartTimer(action: TimerAction): Iterable<SelectEffect | AllEffect<PutEffect> | CallEffect> {
  const timers = yield select((state: AppState) => state.timers)
  const runningTimers = (toArray(timers) as Timer[]).filter(timer => timer.key !== action.payload.key && timer.isRunning && timer.startedAt)

  yield all(runningTimers.map(timer => put(stopTimer(timer))))
  yield call(watchTimers, action)
}

export default function* timerSaga(): Iterable<ForkEffect> {
  yield takeLatest(TIMER.START, watchStartTimer)
  yield takeLatest(TIMER.RESTART, watchTimers)
}
