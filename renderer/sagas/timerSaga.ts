import {
  select,
  all,
  put,
  call,
  take,
  takeLatest,
  ForkEffect,
  AllEffect,
  SelectEffect,
  PutEffect,
  CallEffect,
  fork,
  cancel,
  TakeEffect,
  CancelEffect
} from 'redux-saga/effects'
import { AppState, toArray } from 'models/app'
import { stopTimer, tickTimer } from 'controllers/timerController'
import { TIMER, Timer, TimerAction } from 'models/timer'

// wait :: Number -> Promise
const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })

function* tick(action: TimerAction): Iterable<CallEffect | PutEffect> {
  const { payload } = action

  if (!payload) return

  while (true) {
    yield call(wait, 1000)
    yield put(tickTimer(payload))
  }
}

function* watchTimers(action: TimerAction): Iterable<ForkEffect | TakeEffect | CancelEffect> {
  const { payload } = action

  if (!payload) return

  while (true) {
    const timerTick = yield fork(tick, action)

    yield take((a: any) => {
      return a.type === TIMER.STOP && a.payload && a.payload.key && a.payload.key === payload.key
    })

    yield cancel(timerTick)
    break
  }
}

function* watchStartTimer(action: TimerAction): Iterable<SelectEffect | AllEffect<PutEffect> | CallEffect> {
  const { payload } = action

  if (!payload) return

  const timers = yield select((state: AppState) => state.timers)
  const runningTimers = (toArray(timers) as Timer[]).filter(timer => timer.key !== payload.key && timer.isRunning && timer.startedAt)

  yield all(runningTimers.map(timer => put(stopTimer(timer))))
  yield call(watchTimers, action)
}

export default function* timerSaga(): Iterable<ForkEffect> {
  yield takeLatest(TIMER.START, watchStartTimer)
}
