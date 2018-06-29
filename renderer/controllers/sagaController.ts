import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import orgSaga from 'sagas/orgSaga'
import persistSaga from 'sagas/persistSaga'
import profileSaga from 'sagas/profileSaga'
import repoSaga from 'sagas/repoSaga'

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    orgSaga(),
    persistSaga(),
    profileSaga(),
    repoSaga(),
  ])
}
