import { Resources, Resource } from '@/models/app'
import { Timer } from '@/models/timer'

export enum INVOICE {
  CREATE = 'trax/invoice/CREATE'
}

export interface Invoice extends Resource {
  createdAt?: Date
  timers: Timer[]
}

export interface Invoices extends Resources {
  data: {
    [key: string]: Invoice
  }
}

export interface InvoiceAction {
  readonly type: INVOICE
  readonly payload?: Invoice
}
