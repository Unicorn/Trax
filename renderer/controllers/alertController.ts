import { union, merge } from 'lodash'
import { Resources, defaultState } from 'models/app'
import { ALERT, Alert, AlertAction } from 'models/alert'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: Alert): AlertAction => ({
  type: ALERT.CREATE,
  payload
})

/**
 * Dismiss an alert
 */
export const deleteAlert = (payload: Alert): AlertAction => ({
  type: ALERT.DELETE,
  payload
})

export const alertsReducer = (state: Resources = defaultState, action: AlertAction): Resources => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type) {
    case ALERT.CREATE:
      newState.keys = union(newState.keys, payload.key)
      newState.data[payload.key] = merge(newState.data[payload.key], payload)
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
