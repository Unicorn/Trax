import { TimerEntry } from 'models/timer'

// Constants
export const CREATE_INVOICE = 'trax/invoice/CREATE_INVOICE'
export const DELETE_INVOICE = 'trax/invoice/DELETE_INVOICE'

export interface Invoice {
  id: string;
  created: Date;
  entries: TimerEntry[];
}

export interface CreateInvoice {
  type: typeof CREATE_INVOICE;
  payload?: Invoice;
}

export interface DeleteInvoice {
  type: typeof DELETE_INVOICE;
  payload?: Invoice;
}

export type InvoiceActions = CreateInvoice | DeleteInvoice
