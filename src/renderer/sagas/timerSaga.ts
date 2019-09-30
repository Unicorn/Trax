import { SagaIterator } from 'redux-saga'
import { all, put, call, takeLatest, ForkEffect, fork, cancel } from 'redux-saga/effects'
import { take, select, toArray } from 'horseshoes'
import { RootState } from '@/models/app'
import { stopTimer, tickTimer } from '@/controllers/timerController'
import { TIMER, Timer, TimerAction } from '@/models/timer'

// wait :: Number -> Promise
const wait = (ms: number): Promise<NodeJS.Timeout> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })

function* tick(action: TimerAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  while (true) {
    yield call(wait, 1000)
    yield put(tickTimer(payload))
  }
}

function* watchTimers(action: TimerAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  while (true) {
    const timerTick = yield fork(tick, action)

    yield* take((a: any) => {
      return a.type === TIMER.STOP && a.payload && a.payload.key && a.payload.key === payload.key
    })

    yield cancel(timerTick)
    break
  }
}

function* watchStartTimer(action: TimerAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  const timers = yield* select((state: RootState) => state.timers)
  const runningTimers = (toArray(timers) as Timer[]).filter(timer => timer.key !== payload.key && timer.isRunning && timer.startedAt)

  yield all(runningTimers.map(timer => put(stopTimer(timer))))
  yield call(watchTimers, action)
}

export default function* timerSaga(): Iterable<ForkEffect> {
  yield takeLatest(TIMER.START, watchStartTimer)
}
