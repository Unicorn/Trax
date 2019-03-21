import { TIMER, Timers, TimerAction } from 'models/timer'
import { Issue } from 'models/issue'

export const startTimer = (issue: Issue) => ({
  type: TIMER.START,
  issue
})

export const stopTimer = (issue: Issue) => ({
  type: TIMER.STOP,
  issue
})

export const tickTimer = (issue: Issue) => ({
  type: TIMER.TICK,
  issue
})

export const deleteTimer = (issue: Issue) => ({
  type: TIMER.DELETE,
  issue
})

export const timerReducer = (state: Timers = {}, action: TimerAction) => {
  const { issue, type } = action
  const newState = { ...state }

  if (!issue || !type) return state

  const timer = state[issue.id]

  switch (type) {
    case TIMER.START:
      newState[issue.id] = {
        ...timer,
        id: issue.id,
        issue,
        isRunning: true,
        startedAt: new Date(),
        duration: 0
      }
      return newState

    case TIMER.STOP:
      newState[issue.id] = {
        ...timer,
        id: issue.id,
        issue,
        entries: timer.entries.concat([
          {
            startedAt: timer.startedAt || new Date(),
            stoppedAt: new Date(),
            duration: timer.duration
          }
        ]),
        isRunning: false,
        startedAt: undefined,
        duration: 0
      }
      return newState

    case TIMER.TICK:
      newState[issue.id] = {
        ...timer,
        issue,
        isRunning: true,
        duration: timer.duration + 1
      }
      return newState

    case TIMER.DELETE:
      delete newState[issue.id]
      return newState

    default:
      return state
  }
}
