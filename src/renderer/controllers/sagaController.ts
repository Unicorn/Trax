import { all } from 'redux-saga/effects'

import alertSaga from '@/sagas/alertSaga'
import githubSaga from '@/sagas/githubSaga'
import invoiceSaga from '@/sagas/invoiceSaga'
import appSaga from '@/sagas/appSaga'
import userSaga from '@/sagas/userSaga'
import timerSaga from '@/sagas/timerSaga'
import trackSaga from '@/sagas/trackSaga'
import issueSaga from '@/sagas/issueSaga'
import googleSaga from '@/sagas/googleSaga'
import orgSaga from '@/sagas/orgSaga'
import repoSaga from '@/sagas/repoSaga'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
  yield all([
    alertSaga(),
    githubSaga(),
    invoiceSaga(),
    appSaga(),
    userSaga(),
    timerSaga(),
    trackSaga(),
    issueSaga(),
    googleSaga(),
    orgSaga(),
    repoSaga()
  ])
}
