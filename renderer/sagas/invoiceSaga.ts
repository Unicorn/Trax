import { takeLatest, put, all } from 'redux-saga/effects'
import { INVOICE, InvoiceAction } from 'models/invoice'
import { deleteTimer } from 'controllers/timerController'

function* watchCreateInvoice(action: InvoiceAction) {
  const { invoice } = action

  if (!invoice) return

  yield console.log('watchCreateInvoice')

  yield all(invoice.timers.map(timer => put(deleteTimer(timer.issue))))
}

export default function* invoiceSaga() {
  yield takeLatest(INVOICE.CREATE, watchCreateInvoice)
}
