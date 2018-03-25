import { Dispatch } from 'redux'
import {
  CREATE_ALERT,
  DELETE_ALERT,
  CLEAR_ALERTS,
  TAlert,
  TAlerts,
  TAlertActions
} from 'types/alert'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = (payload: TAlert) => (dispatch: Dispatch<TAlertActions>) => {
  if (!payload.id) {
    payload.id = new Date().getTime().toString()
  }

  dispatch({ type: CREATE_ALERT, payload })

  if (payload.dismissAfter) {
    setTimeout(() => { dispatch(deleteAlert(payload.id)) }, payload.dismissAfter)
  }
}

/**
 * Dismiss an alert by the given id.
 */
export const deleteAlert = (id: any) => ({
  type: DELETE_ALERT,
  payload: { id }
})

/**
 * Clear all notifications
 */
export const clearAlerts = () => ({
  type: CLEAR_ALERTS
})

export const alertReducer = (state: TAlerts = [], action: TAlertActions) => {
  if (!action || !action.type) {
    return state
  }

  switch (action.type) {
    case CREATE_ALERT:
      return state.concat([action.payload])

    case DELETE_ALERT:
      return state.filter(({ id }) => id !== action.payload.id)

    case CLEAR_ALERTS:
      return []

    default:
      return state
  }
}
