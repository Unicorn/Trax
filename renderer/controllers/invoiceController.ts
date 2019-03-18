import { v4 } from 'uuid'
import { INVOICE, InvoiceAction, Invoices, Invoice } from 'models/invoice'

export const createInvoice = (invoice: Invoice) => ({
  type: INVOICE.CREATE,
  invoice
})

export const invoiceReducer = (state: Invoices = {}, action: InvoiceAction) => {
  const { type, invoice } = action
  const newState = { ...state }
  const id = action.id || v4()

  if (!type || !invoice) return state

  switch (type)
  {
    case INVOICE.CREATE :
      if (!invoice.timers) return state

      newState[id] = {
        id,
        timers: invoice.timers,
        createdAt: new Date()
      }
      return newState

    default :
      return state
  }
}
