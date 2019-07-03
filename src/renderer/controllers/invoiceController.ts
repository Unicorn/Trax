import { initialState } from '@/models/app'
import { INVOICE, Invoices, Invoice, InvoiceAction } from '@/models/invoice'
import { createResource } from 'horseshoes'

export const createInvoice = (payload: Invoice): InvoiceAction => ({
  type: INVOICE.CREATE,
  payload
})

export const invoiceReducer = (state: Invoices, action: InvoiceAction): Invoices => {
  if (state === undefined) return initialState.invoices

  const { type, payload } = action

  if (!payload) return state

  switch (type) {
    case INVOICE.CREATE:
      if (!payload.timers) return state
      return createResource<Invoice>(state, payload)

    default:
      return state
  }
}
