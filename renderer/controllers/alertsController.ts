import {
  CREATE_ALERT,
  DELETE_ALERT,
  Alert,
  Alerts,
  AlertAction
} from 'models/alert'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: Alert): AlertAction => ({
  type: CREATE_ALERT,
  payload: {
    ...payload,
    key: payload.key || new Date().getTime().toString()
  }
})

/**
 * Dismiss an alert
 */
export const deleteAlert = (payload: Alert): AlertAction => ({
  type: DELETE_ALERT,
  payload
})

export const alertsReducer = (state: Alerts = [], action: AlertAction): Alerts => {
  const { payload, type } = action

  if (!payload || !type)
    return state

  switch (type) {
    case CREATE_ALERT:
      return state.concat(payload)

    case DELETE_ALERT:
      return state.filter(({ key }) => key !== payload.key)

    default:
      return state
  }
}
