import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import persistSaga from 'sagas/persistSaga'
import userSaga from 'sagas/userSaga'

export default function* rootSaga() {
  yield all([alertSaga(), persistSaga(), userSaga()])
}
