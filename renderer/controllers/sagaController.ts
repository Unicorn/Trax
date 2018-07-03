import { all } from 'redux-saga/effects'

import alertSaga from 'sagas/alertSaga'
import authSaga from 'sagas/authSaga'
import issueSaga from 'sagas/issueSaga'
import orgSaga from 'sagas/orgSaga'
import persistSaga from 'sagas/persistSaga'
import profileSaga from 'sagas/profileSaga'
import repoSaga from 'sagas/repoSaga'
import trackSaga from 'sagas/trackSaga'

export default function* rootSaga() {
  yield all([
    alertSaga(),
    authSaga(),
    issueSaga(),
    orgSaga(),
    persistSaga(),
    profileSaga(),
    repoSaga(),
    trackSaga(),
  ])
}
