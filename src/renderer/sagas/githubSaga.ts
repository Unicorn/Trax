import { SagaIterator } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'
import { call } from 'horseshoes'
import { receiveAuth } from '@/controllers/githubController'
import { requestProfile } from '@/controllers/profileController'
import { setPage } from '@/controllers/settingController'
import { GITHUB_AUTH } from '@/models/github'
import { randString } from '@/helpers/stringHelper'
import { authorizeApp, getToken } from '@/helpers/authHelper'
import { GITHUB, MICROSERVICE } from '@/config/constants'

function* watchAuthRequest(): SagaIterator {
  try {
    const authUrl = `${GITHUB.HOST}/login/oauth/authorize?client_id=${GITHUB.CLIENT_ID}&scope=${GITHUB.SCOPE}&state=${randString()}`
    const tokenUrl = `${MICROSERVICE.API}${MICROSERVICE.GITHUB.AUTH}`
    const filter = `http://localhost:1323/github/auth*`
    const code = yield* call(authorizeApp, authUrl, filter)
    const token = yield* call(getToken, tokenUrl, code)

    token.accessToken && localStorage.setItem('github.accessToken', token.accessToken)

    yield put(receiveAuth(token))
  } catch (error) {
    console.log('Error in githubSaga: watchAuthRequest', error)
  }
}

function* watchAuthSuccess(): SagaIterator {
  yield put(requestProfile())
}

function* watchLogout(): SagaIterator {
  yield put(setPage('welcome'))
}

export default function* authSaga(): SagaIterator {
  yield takeLatest(GITHUB_AUTH.REQUEST, watchAuthRequest)
  yield takeLatest(GITHUB_AUTH.SUCCESS, watchAuthSuccess)
  yield takeLatest(GITHUB_AUTH.LOGOUT, watchLogout)
}
