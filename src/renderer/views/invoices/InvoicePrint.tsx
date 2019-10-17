/**
 * @jsx createElement
 */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { Invoice } from '@/models/invoice'
import { RootState } from '@/models/app'
import InvoiceEntry from '@/views/invoices/InvoiceEntry'
import { formatDate, timersDuration, timeToCost } from '@/helpers/timerHelper'

interface Connected {
  invoice: Invoice
  rate: number
}

const InvoicePrint: SFC<Connected> = ({ invoice, rate }) => {
  return (
    <section className="invoice details print">
      <header>
        <h1>Invoice {(new Date(invoice.createdAt)).getTime()}</h1>
        <p>Created At: {formatDate(invoice.createdAt)}</p>
      </header>

      <table className="compact">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date Range</th>
            <th>Total Time</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {invoice.timers.map(timer => <InvoiceEntry timer={timer} rate={rate} />)}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>{timersDuration(invoice.timers, true)}</td>
            <td>{timeToCost(invoice.timers, rate)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

const mapState = ({ invoices, settings }: RootState): Connected => ({
  invoice: invoices.data[window.location.search.replace(/\?invoice\=/, '')],
  rate: settings.invoices.rate ? parseInt(settings.invoices.rate) : 0
})

export default connect(mapState)(InvoicePrint)