import { TIMER, Timers, TimerAction, defaultTimerState } from 'models/timer'

export const startTimer = (id: number) => ({
  type: TIMER.START,
  id
})

export const stopTimer = (id: number) => ({
  type: TIMER.STOP,
  id
})

export const tickTimer = (id: number) => ({
  type: TIMER.TICK,
  id
})

export const timerReducer = (state: Timers = {}, action: TimerAction) => {
  const { id, type } = action
  const newState = { ...state }

  console.log('timer in reducer', id, state[id])

  if (!id || !type) return state

  const timer = state[id] || defaultTimerState

  switch (type)
  {
    case TIMER.START :
      newState[id] = {
        ...timer,
        id,
        isRunning: true,
        startedAt: new Date(),
        duration: 0,
      }

      console.log('new', newState[id])

      return newState

    case TIMER.STOP :
      newState[id] = {
        ...timer,
        id,
        entries: timer.entries.concat([{
          startedAt: timer.startedAt!,
          stoppedAt: new Date(),
          duration: timer.duration
        }]),
        isRunning: false,
        startedAt: undefined,
        duration: 0,
      }

      return newState

    case TIMER.TICK :
      newState[id] = {
        ...timer,
        id,
        isRunning: true,
        duration: timer.duration + 1
      }

      console.log('tic', id, timer, timer.duration)

      return newState

    default :
      return state
  }
}
