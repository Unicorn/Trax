import { Timer } from 'models/timer'

export enum INVOICE {
  CREATE = 'trax/invoice/CREATE',
}

export interface Invoice {
  id?: string
  createdAt?: Date
  timers: Timer[]
}

export interface Invoices {
  [key: string]: Invoice
}

export type InvoiceAction = {
  readonly id?: string
  readonly type: INVOICE
  readonly invoice?: Invoice
}
