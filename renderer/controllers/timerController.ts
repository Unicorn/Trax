import { union, merge } from 'lodash'
import { defaultState } from 'models/app'
import * as TimerModel from 'models/timer'
import { secondsLapsed } from 'helpers/timerHelper'

export const startTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.START,
  payload
})

export const restartTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.RESTART,
  payload
})

export const stopTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.STOP,
  payload
})

export const tickTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.TICK,
  payload
})

export const resetTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.RESET,
  payload
})

export const deleteTimer = (payload: TimerModel.Timer): TimerModel.TimerAction => ({
  type: TimerModel.TIMER.DELETE,
  payload
})

export const timerReducer = (state: TimerModel.Timers = defaultState, action: TimerModel.TimerAction): TimerModel.Timers => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case TimerModel.TIMER.START:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: true,
        startedAt: new Date()
      })
      break

    case TimerModel.TIMER.RESTART:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        duration: Math.round((new Date().getTime() - new Date(payload.startedAt || new Date()).getTime()) / 1000)
      })
      break

    case TimerModel.TIMER.STOP:
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

    case TimerModel.TIMER.TICK:
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: true,
        duration: payload.startedAt ? secondsLapsed(payload.startedAt) : newState.data[payload.key].duration + 1
      })
      break

    case TimerModel.TIMER.RESET:
      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = merge(newState.data[payload.key], {
        ...payload,
        isRunning: false,
        duration: 0
      })
      break

    case TimerModel.TIMER.DELETE:
      newState.keys = newState.keys.filter(key => key !== payload.key)
      delete newState.data[payload.key]
      break

    default:
      return state
  }

  return newState
}
