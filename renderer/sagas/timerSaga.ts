import { toPairs } from 'lodash'
import { put, call, race, take, select, takeLatest } from 'redux-saga/effects'
import { stopTimer, tickTimer } from 'controllers/timerController'
import { TIMER, Timer, TimerAction } from 'models/timer'

// wait :: Number -> Promise
const wait = (ms: number) => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
)

function* watchTimers(action: TimerAction) {
  const { issue } = action

  if (!issue)
    return

  // Search for running timers and stop them
  const timers = yield select((state: any) => state.timers)
  const runningTimers = toPairs(timers).map((t: [string, Object]) => t[1] as Timer).filter(t => t.issue.id && t.isRunning)
  yield runningTimers.map(t => t.issue && put(stopTimer(t.issue)))

  // Listen for a TIMER.STOP action, otherwise start tickin!
  while(true) {
    const currentTimer = yield race({
      stopped: take(TIMER.STOP),
      tick: call(wait, 1000)
    })

    if (!currentTimer.stopped)
      yield put(tickTimer(issue))
    else
      break
  }
}


export default function* timerSaga() {
  yield takeLatest(TIMER.START, watchTimers)
}
