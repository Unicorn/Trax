import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'

export default function* rootSaga() {
  yield all([alertSaga()])
}
