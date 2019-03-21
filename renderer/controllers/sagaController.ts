import { all, AllEffect, ForkEffect } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import invoiceSaga from 'sagas/invoiceSaga'
import persistSaga from 'sagas/persistSaga'
import userSaga from 'sagas/userSaga'
import timerSaga from 'sagas/timerSaga'
import trackSaga from 'sagas/trackSaga'
import issueSaga from 'sagas/issueSaga'
import githubSaga from 'sagas/githubSaga'

export default function* rootSaga(): Iterable<AllEffect<Iterable<ForkEffect>>> {
  yield all([alertSaga(), authSaga(), invoiceSaga(), persistSaga(), userSaga(), timerSaga(), trackSaga(), githubSaga(), issueSaga()])
}
