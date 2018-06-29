import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import persistSaga from 'sagas/persistSaga'

export default function* rootSaga() {
  yield all([alertSaga(), persistSaga(), authSaga()])
}
