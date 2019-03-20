import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import issueSaga from 'sagas/issueSaga'
import invoiceSaga from 'sagas/invoiceSaga'
import persistSaga from 'sagas/persistSaga'
import userSaga from 'sagas/userSaga'
import timerSaga from 'sagas/timerSaga'
import trackSaga from 'sagas/trackSaga'
import githubSaga from 'sagas/githubSaga'

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    issueSaga(),
    invoiceSaga(),
    persistSaga(),
    userSaga(),
    timerSaga(),
    trackSaga(),
    githubSaga()
  ])
}
