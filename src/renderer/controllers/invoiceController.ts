import { union } from 'lodash'
import { Resources, defaultState } from '@/models/app'
import { INVOICE, Invoice, InvoiceAction } from '@/models/invoice'

export const createInvoice = (payload: Invoice): InvoiceAction => ({
  type: INVOICE.CREATE,
  payload
})

export const invoiceReducer = (state: Resources = defaultState, action: InvoiceAction): Resources => {
  const { type, payload } = action

  if (!type || !payload) return state

  const newState = { ...state }

  switch (type) {
    case INVOICE.CREATE:
      if (!payload.timers) return state

      newState.keys = union(newState.keys, [payload.key])
      newState.data[payload.key] = {
        ...payload,
        createdAt: new Date()
      }
      break

    default:
      return state
  }

  return newState
}
