const CREATE_ALERT = 'CREATE_ALERT'
const DELETE_ALERT = 'DELETE_ALERT'
const CLEAR_ALERTS = 'CLEAR_ALERTS'

/**
 * Publish an alert
 * - if `dismissAfter` was set, the alert will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.
 */
export const createAlert = data => dispatch => {
  const payload = Object.assign({}, data)

  if (!payload.id) payload.id = new Date().getTime().toString()

  dispatch({ type: CREATE_ALERT, payload })

  if (payload.dismissAfter)
    setTimeout(() => {
      dispatch({ type: DELETE_ALERT, payload: payload.id })
    }, payload.dismissAfter)
}

/**
 * Dismiss an alert by the given id.
 */
export const deleteAlert = id => ({ type: DELETE_ALERT, payload: id })

/**
 * Clear all notifications
 */
export const clearAlerts = () => ({ type: CLEAR_ALERTS })

export const alertReducer = (state = [], action) => {
  if (!action || !action.type) return state

  switch (action.type) {
    case CREATE_ALERT:
      return [
        action.payload,
        ...state.filter(({ id }) => id !== action.payload.id),
      ]

    case DELETE_ALERT:
      return state.filter(notif => notif.id !== action.payload)

    case CLEAR_ALERTS:
      return []

    default:
      return state
  }
}
