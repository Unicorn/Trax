import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import userSaga from 'sagas/userSaga'

export default function* rootSaga() {
  yield all([alertSaga(), userSaga()])
}
