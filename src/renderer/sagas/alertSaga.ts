import { put, takeEvery, ForkEffect, PutEffect } from 'redux-saga/effects'
import { ALERT, AlertAction, deleteAlert } from 'horseshoes'

const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))

function* watchAlerts(action: AlertAction): Iterable<Promise<void> | PutEffect> {
  const { payload } = action

  if (payload && payload.dismissAfter) {
    yield delay(payload.dismissAfter)
    yield put(deleteAlert(payload))
  }

  return
}

export default function* alertSaga(): Iterable<ForkEffect> {
  yield takeEvery(ALERT.CREATE, watchAlerts)
}
