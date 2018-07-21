import { ALERT, Alert, Alerts, AlertAction } from 'models/alert'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: Alert): AlertAction => ({
  type: ALERT.CREATE,
  payload: {
    ...payload,
    key: payload.key || new Date().getTime().toString()
  }
})

/**
 * Dismiss an alert
 */
export const deleteAlert = (payload: Alert): AlertAction => ({
  type: ALERT.DELETE,
  payload
})

export const alertsReducer = (state: Alerts = [], action: AlertAction): Alerts => {
  const { payload, type } = action

  if (!payload || !type) return state

  switch (type) {
    case ALERT.CREATE:
      return state.concat(payload)

    case ALERT.DELETE:
      return state.filter(({ key }) => key !== payload.key)

    default:
      return state
  }
}
