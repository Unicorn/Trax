import { TIMER } from 'models/timer'

export const startTimer = () => ({
  type: TIMER.START
})

export const stopTimer = () => ({
  type: TIMER.STOP
})

export const timerReducer = (state = {}, action) => {
  return state
}
