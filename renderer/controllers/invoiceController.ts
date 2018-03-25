import {
  CREATE_INVOICE,
  DELETE_INVOICE,
  TInvoice,
  TInvoices,
  TInvoiceActions
} from 'types/invoice'

export const createInvoice = (payload: TInvoice) => ({
  type: CREATE_INVOICE,
  payload
})

export const deleteInvoice = (id: any) => ({
  type: DELETE_INVOICE,
  payload: { id }
})

export const invoiceReducer = (state: TInvoices = [], action: TInvoiceActions) => {
  if (!action || !action.type) {
    return state
  }

  switch (action.type) {
    case CREATE_INVOICE:
      return state.concat([action.payload])
    case DELETE_INVOICE:
      return state.filter(({ id }) => id !== action.payload.id)
    default:
      return state
  }
}
