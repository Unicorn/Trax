import { put, takeEvery } from 'redux-saga/effects'
import { deleteAlert } from 'controllers/alertController'
import { ALERT, AlertAction } from 'models/alert'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

function* watchAlerts(action: AlertAction) {
  const { payload } = action

  if (payload && payload.dismissAfter) {
    yield delay(payload.dismissAfter)
    yield put(deleteAlert(payload))
  }

  return
}

export default function* alertSaga() {
  yield takeEvery(ALERT.CREATE, watchAlerts)
}
