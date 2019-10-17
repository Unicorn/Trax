import { SagaIterator } from 'redux-saga'
import { all, put, takeLatest, ForkEffect, fork, cancel } from 'redux-saga/effects'
import { call, take, select, toArray } from 'horseshoes'
import { stopTimer, tickTimer } from '@/controllers/timerController'
import { RootState } from '@/models/app'
import { TIMER, Timer, TimerAction } from '@/models/timer'
import { getGoogleAuth, getGoogleTimesheet } from '@/models/google'
import { addRowToSheet, createGoogleClient } from '@/helpers/googleHelper'
import { formatDate, formatTime } from '@/helpers/timerHelper'

// wait :: Number -> Promise
const wait = (ms: number): Promise<NodeJS.Timeout> =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })

function* tick(action: TimerAction): SagaIterator {
  const { payload } = action

  if (!payload) return

  while (true) {
    yield* call(wait, 1000)
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
  yield* call(watchTimers, action)
}

function* watchStopTimer({ payload }: TimerAction): SagaIterator {
  if (!payload || !payload.issue) return

  const entry = payload.entries.pop()

  if (!entry || !entry.startedAt || !entry.stoppedAt) return

  const credentials = yield* select(getGoogleAuth)

  if (!credentials) return

  yield* call(createGoogleClient, credentials)

  const timesheet = yield* select(getGoogleTimesheet)

  if (!timesheet.sheetName) return

  const data = [
    formatDate(entry.startedAt),
    formatTime(entry.startedAt),
    formatTime(entry.stoppedAt),
    '',
    '',
    payload.issue.ident,
    'DEV',
    payload.issue.title
  ]
  timesheet.data = data.join(',')

  const response = yield* call(addRowToSheet, timesheet)

  console.log('response', response)
}

export default function* timerSaga(): Iterable<ForkEffect> {
  yield takeLatest(TIMER.START, watchStartTimer)
  yield takeLatest(TIMER.STOP, watchStopTimer)
}
