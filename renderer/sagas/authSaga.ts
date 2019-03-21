import { BrowserWindow } from 'electron'
import { eventChannel, END } from 'redux-saga'
import { put, call, take, takeLatest } from 'redux-saga/effects'
import { camelizeKeys } from 'humps'
import { receiveAuth } from 'controllers/authController'
import { createAlert } from 'controllers/alertController'
import { requestProfile } from 'controllers/profileController'
import { setPage } from 'controllers/settingController'
import { randString } from 'helpers/stringHelper'
import { AUTH } from 'models/auth'
import { GITHUB, MICROSERVICE } from 'config/constants'

declare global {
  interface Window {
    authWindow: BrowserWindow
  }
}

const createAuthWindow = () => {
  // Build the OAuth consent page URL
  const win = new window.BrowserWindow({
    width: 600,
    height: 750,
    show: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false
    }
  })

  const githubUrl = `${GITHUB.HOST}/login/oauth/authorize?`
  const authUrl = `${githubUrl}client_id=${GITHUB.CLIENT_ID}&scope=${GITHUB.SCOPE}&state=${randString()}`

  win.loadURL(authUrl)

  window.authWindow = win
}

const parseGithubAuth = (rawURL: string): any => {
  const url = new URL(rawURL)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  return { code, error }
}

const getGithubAuthCode = () => {
  const contents = window.authWindow.webContents

  return eventChannel(emit => {
    const filter = { urls: [`${MICROSERVICE.API}/*`] }
    contents.session.webRequest.onBeforeRequest(filter, (details, callback) => {
      const { code, error } = parseGithubAuth(details.url)
      emit({ code, error })
      emit(END)
      callback({})
    })

    return () => window.authWindow.destroy()
  })
}

const getGithubAuthToken = async (code: string) => {
  return fetch(`${MICROSERVICE.API}/auth?code=${code}`)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }: any) => {
      localStorage.setItem('accessToken', json['access_token'])
      return response.ok ? <any>camelizeKeys(json) : Promise.reject(json)
    })
    .then((response: Response) => ({ ...response }), (error: Error) => ({ error: error.message || 'Something bad happened' }))
}

function* watchLogout() {
  yield put(setPage('welcome'))
}

function* watchAuthRequest() {
  yield createAuthWindow()
  const authCode = yield call(getGithubAuthCode)
  const { code, error } = yield take(authCode)

  if (error) {
    yield put(
      createAlert({
        key: 'watchAuthRequestError',
        status: 'error',
        dismissable: true,
        message: "Oops! Something went wrong and we couldn't log you in using Github. Please try again."
      })
    )

    return
  }

  const auth = yield call(getGithubAuthToken, code)

  yield put(receiveAuth(auth))
}

function* watchAuthSuccess() {
  yield put(requestProfile())
}

export default function* authSaga() {
  yield takeLatest(AUTH.LOGOUT, watchLogout)
  yield takeLatest(AUTH.REQUEST, watchAuthRequest)
  yield takeLatest(AUTH.SUCCESS, watchAuthSuccess)
}
