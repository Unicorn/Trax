import { Timer } from 'models/timer'

export enum INVOICE {
  CREATE = 'trax/invoice/CREATE'
}

export interface Invoice {
  key: string
  createdAt?: Date
  timers: Timer[]
}

export interface Invoices {
  [key: string]: Invoice
}

export interface InvoiceAction {
  readonly type: INVOICE
  readonly payload: Invoice
}
