import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import invoiceSaga from 'sagas/invoiceSaga'
import appSaga from 'sagas/appSaga'
import userSaga from 'sagas/userSaga'
import timerSaga from 'sagas/timerSaga'
import trackSaga from 'sagas/trackSaga'
import issueSaga from 'sagas/issueSaga'
import githubSaga from 'sagas/githubSaga'

export default function* rootSaga(): any {
  yield all([alertSaga(), authSaga(), invoiceSaga(), appSaga(), userSaga(), timerSaga(), trackSaga(), githubSaga(), issueSaga()])
}
