import { union, merge } from 'lodash'
import { initialState } from '@/models/app'
import { TIMER, Timers, Timer, TimerAction } from '@/models/timer'
import { secondsLapsed } from '@/helpers/timerHelper'

export const startTimer = (payload: Timer): TimerAction => ({
  type: TIMER.START,
  payload
})

export const restartTimer = (payload: Timer): TimerAction => ({
  type: TIMER.RESTART,
  payload
})

export const stopTimer = (payload: Timer): TimerAction => ({
  type: TIMER.STOP,
  payload
})

export const tickTimer = (payload: Timer): TimerAction => ({
  type: TIMER.TICK,
  payload
})

export const resetTimer = (payload: Timer): TimerAction => ({
  type: TIMER.RESET,
  payload
})

export const deleteTimer = (payload: Timer): TimerAction => ({
  type: TIMER.DELETE,
  payload
})

export const timerReducer = (state: Timers, action: TimerAction): Timers => {
  if (state === undefined) return initialState.timers

  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case TIMER.START:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: true,
        startedAt: new Date()
      })
      break

    case TIMER.RESTART:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        duration: Math.round((new Date().getTime() - new Date(payload.startedAt || new Date()).getTime()) / 1000)
      })
      break

    case TIMER.STOP:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        entries: payload.entries.concat([
          {
            startedAt: payload.startedAt,
            stoppedAt: new Date(),
            duration: payload.duration
          }
        ]),
        isRunning: false,
        startedAt: null,
        duration: 0
      })
      break

    case TIMER.TICK:
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: true,
        duration: payload.startedAt ? secondsLapsed(payload.startedAt) : newState.data[payload.key].duration + 1
      })
      break

    case TIMER.RESET:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: false,
        duration: 0
      })
      break

    case TIMER.DELETE:
      newState.keys = newState.keys.filter(key => key !== payload.key)
      delete newState.data[payload.key]
      break

    default:
      return state
  }

  return newState
}
