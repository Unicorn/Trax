import {
  CREATE_INVOICE,
  DELETE_INVOICE,
  Invoice,
  InvoiceActions
} from 'models/invoice'

export const createInvoice = (payload: Invoice) => ({
  type: CREATE_INVOICE,
  payload
})

export const deleteInvoice = (id: any) => ({
  type: DELETE_INVOICE,
  payload: { id }
})

export const invoicesReducer = (state: Invoice[] = [], action: InvoiceActions) => {
  if (!action || !action.type) {
    return state
  }

  switch (action.type) {
    case CREATE_INVOICE:
      return state.concat([action.payload as Invoice])
    case DELETE_INVOICE:
      return state.filter(({ id }) => id !== action.payload!.id)
    default:
      return state
  }
}
