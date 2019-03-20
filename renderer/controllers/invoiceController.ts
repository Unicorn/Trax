import { Resources, defaultState } from 'models/app'
import { INVOICE, Invoice, InvoiceAction } from 'models/invoice'
import { v4 } from 'uuid'

export const createInvoice = (payload: Invoice) => ({
  type: INVOICE.CREATE,
  payload: {
    ...payload,
    key: payload.key || v4()
  }
})

export const invoiceReducer = (state: Resources = defaultState, action: InvoiceAction): Resources => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type)
  {
    case INVOICE.CREATE :
      if (!payload.timers) return state

      newState.keys = newState.keys.filter(key => key !== payload.key)
      newState.data[payload.key] = {
        ...payload,
        createdAt: new Date()
      }
      break

    default :
      return state
  }

  return newState
}
