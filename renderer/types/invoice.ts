import { TTimerEntry } from 'types/timer'

// Constants
export const CREATE_INVOICE = 'trax/invoice/CREATE_INVOICE'
export const DELETE_INVOICE = 'trax/invoice/DELETE_INVOICE'

export type TInvoice = {
  id: string;
  created: Date;
  entries: TTimerEntry[];
}

export type TInvoices = TInvoice[]

export interface IACreateInvoice {
  type: typeof CREATE_INVOICE;
  payload: TInvoice;
}

export interface IADeleteInvoice {
  type: typeof DELETE_INVOICE;
  payload: TInvoice;
}

export type TInvoiceActions = IACreateInvoice | IADeleteInvoice
