import { Resources, Resource } from 'horseshoes'
import { Timer } from '@/models/timer'

export enum INVOICE {
  CREATE = 'trax/invoice/CREATE'
}

export interface Invoice extends Resource {
  createdAt: Date
  timers: Timer[]
}

export interface Invoices extends Resources<Invoice> {
  debug?: boolean // Stubbed
}

export interface InvoiceAction {
  readonly type: INVOICE
  readonly payload?: Invoice
}
