import { formatClock } from 'helpers/traxHelper'

// Constant Names
const START_TIMER = 'trax/timer/START_TIMER'
const STOP_TIMER = 'trax/timer/STOP_TIMER'
const TICK_TIMER = 'trax/timer/TICK_TIMER'
const SET_SELECTED = 'trax/timer/SET_SELECTED'
const SET_INVOICED = 'trax/timer/SET_INVOICED'

// Internal Helpers
const _runningTimers = timers => {
  const entries = Object.entries(timers).map(o => o[1])
  return entries.filter(t => t.isRunning)
}

// Action Creators
const tick = id => {
  return {
    type: TICK_TIMER,
    id,
  }
}

export const startTimer = id => (dispatch, getState) => {
  const entries = _runningTimers(getState().timer)
  entries.forEach(entry => dispatch(stopTimer(entry.id)))

  return dispatch({
    type: START_TIMER,
    timer: setInterval(() => dispatch(tick(id)), 1000),
    id,
  })
}

export const stopTimer = id => {
  return {
    type: STOP_TIMER,
    id,
  }
}

export const setSelected = (id, selected) => ({
  type: SET_SELECTED,
  id,
  selected,
})

export const setInvoiced = (id, invoiced) => ({
  type: SET_INVOICED,
  id,
  invoiced,
})

// Reducer / Store
const initialState = {
  invoiced: false,
  selected: false,
  isRunning: false,
  startedAt: null,
  counter: 0,
  timer: null,
  entries: [],
}

export const timerReducer = (state = {}, action) => {
  let newState = { ...state }
  let record = state[action.id] || initialState
  record.id = action.id

  switch (action.type) {
    case SET_SELECTED:
      newState[action.id] = {
        ...record,
        selected: action.selected,
      }
      return newState

    case SET_INVOICED:
      newState[action.id] = {
        ...record,
        invoiced: action.invoiced,
      }
      return newState

    case START_TIMER:
      newState[action.id] = {
        ...record,
        isRunning: true,
        startedAt: new Date(),
        counter: 0,
        timer: action.timer,
      }
      return newState

    case STOP_TIMER:
      clearInterval(state[action.id].timer)
      var currentTime = new Date()
      newState[action.id] = {
        ...record,
        isRunning: false,
        startedAt: null,
        counter: 0,
        timer: null,
        entries: record.entries.concat([
          {
            startedAt: state[action.id].startedAt,
            stoppedAt: currentTime,
            duration: Math.round(
              (currentTime - state[action.id].startedAt) / 1000
            ),
          },
        ]),
      }
      return newState

    case TICK_TIMER:
      newState[action.id] = {
        ...record,
        counter: record.counter + 1,
      }

      if (window.process) {
        const { ipcRenderer } = window.require('electron')
        ipcRenderer.send('timer-tick', ` ${formatClock(record.counter + 1)}`)
      }

      return newState

    default:
      return state
  }
}
