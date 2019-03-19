import { Resources, initialState } from 'models/app'
import { ALERT, Alert, AlertAction } from 'models/alert'
import { v4 } from 'uuid'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: Alert): AlertAction => ({
  type: ALERT.CREATE,
  payload: {
    ...payload,
    key: payload.key || v4()
  }
})

/**
 * Dismiss an alert
 */
export const deleteAlert = (payload: Alert): AlertAction => ({
  type: ALERT.DELETE,
  payload
})

export const alertsReducer = (state: Resources = initialState, action: AlertAction): Resources => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type) {
    case ALERT.CREATE:
      newState.keys.push(payload.key)
      newState.data[payload.key] = payload
      break

    case ALERT.DELETE:
      newState.keys = newState.keys.filter(key => key !== payload.key)
      delete newState.data[payload.key]
      break

    default:
      return state
  }

  return newState
}
