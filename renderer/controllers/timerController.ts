import { TIMER, Timer, TimerAction } from 'models/timer'

export const startTimer = (payload: Timer) => ({
  type: TIMER.START,
  payload
})

export const stopTimer = (payload: Timer) => ({
  type: TIMER.STOP,
  payload
})

export const timerReducer = (state = {}, action: TimerAction) => {
  const { payload, type } = action

  if (!payload || !type) return state

  switch (type)
  {
    case TIMER.START :
      return state

    case TIMER.STOP :
      return state

    default :
      return state
  }
}
