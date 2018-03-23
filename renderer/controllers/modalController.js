const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'

/**
 * Show Modal with a given id and payload.
 */
export const openModal = payload => ({ type: OPEN_MODAL, payload })

/**
 * Dismiss a modal by the given id.
 */
export const closeModal = id => ({ type: CLOSE_MODAL, payload: id })

export const modalReducer = (state = [], action) => {
  if (!action || !action.type) return state

  switch (action.type) {
    case OPEN_MODAL:
      return [
        action.payload,
        ...state.filter(({ id }) => id !== action.payload.id),
      ]

    case CLOSE_MODAL:
      return state.filter(modal => modal.id !== action.payload)

    default:
      return state
  }
}
