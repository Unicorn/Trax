import { takeLatest, put, all, ForkEffect, AllEffect, PutEffect } from 'redux-saga/effects'
import { INVOICE, InvoiceAction } from 'models/invoice'
import { deleteTimer } from 'controllers/timerController'
import { createAlert } from 'controllers/alertController'

function* watchCreateInvoice(action: InvoiceAction): Iterable<AllEffect<PutEffect> | PutEffect> {
  const { payload } = action

  try {
    yield all(payload.timers.map(timer => put(deleteTimer(timer.issue))))
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchCreateInvoiceError',
        status: 'error',
        message: `Error reloading track: ${e.message}`,
        dismissable: true
      })
    )
  }
}

export default function* invoiceSaga(): Iterable<ForkEffect> {
  yield takeLatest(INVOICE.CREATE, watchCreateInvoice)
}
