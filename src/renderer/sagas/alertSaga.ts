import { put, takeLatest, ForkEffect, PutEffect } from 'redux-saga/effects'
import { deleteAlert } from '@/controllers/alertController'
import { ALERT, AlertAction } from '@/models/alert'

const delay = (ms: number): Promise<any> => new Promise(res => setTimeout(res, ms))

function* watchAlerts(action: AlertAction): Iterable<Promise<any> | PutEffect> {
  const { payload } = action

  if (payload && payload.dismissAfter) {
    yield delay(payload.dismissAfter)
    yield put(deleteAlert(payload))
  }

  return
}

export default function* alertSaga(): Iterable<ForkEffect> {
  yield takeLatest(ALERT.CREATE, watchAlerts)
}
