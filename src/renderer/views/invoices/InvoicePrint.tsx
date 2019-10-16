/**
 * @jsx createElement
 */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { Invoice } from '@/models/invoice'
import { RootState } from '@/models/app'

interface Connected {
  invoice: Invoice
}

const InvoicePrint: SFC<Connected> = ({ invoice }) => {
  return (
    <section className="invoice details print">
      <h1>Invoice {invoice.key}</h1>
      <h2>Created At: {invoice.createdAt}</h2>
    </section>
  )
}

const mapState = ({ invoices }: RootState): Connected => ({
  invoice: invoices.data[window.location.search.replace(/\?invoice\=/, '')]
})

export default connect(mapState)(InvoicePrint)