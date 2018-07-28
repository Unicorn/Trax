import { BrowserWindow } from 'electron'
import { eventChannel, END } from 'redux-saga'
import { put, call, take, takeEvery } from 'redux-saga/effects'
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
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      nodeIntegration: false,
    },
  })

  const githubUrl = `${GITHUB.HOST}/login/oauth/authorize?`
  const authUrl = `${githubUrl}client_id=${GITHUB.CLIENT_ID}&scope=${GITHUB.SCOPE}&state=${randString()}`

  win.loadURL(authUrl)

  window.authWindow = win
}

const parseGithubAuth = (rawURL: string): any => {
  const url = new URL(rawURL)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  return { code, error }
}

const getGithubAuthCode = () => {
  const contents = window.authWindow.webContents

  return eventChannel(emit => {
    contents.on('did-fail-load', (_e: Event, _errCode: number, error: string, url: string) => {
      if (!url.match(GITHUB.HOST)) return

      console.log(`Invalid Hostname - ${_errCode}`, `Could not load ${GITHUB.HOST}. ${error}`)
      emit({ error })
    })

    contents.on('will-navigate', (_e: Event, url: string) => {
      if (!url.match(MICROSERVICE.API)) return

      console.log('will-navigate', url)
      contents.stop()
      const { code, error } = parseGithubAuth(url)

      emit({ code, error })
      emit(END)
    })

    contents.on('did-get-redirect-request', (_e: Event, _old: string, url: string) => {
      if (!url.match(MICROSERVICE.API)) return

      console.log('did-get-redirect-request', url)
      contents.stop()
      const { code, error } = parseGithubAuth(url)

      emit({ code, error })
      emit(END)
    })

    return () => window.authWindow.destroy()
  })
}

const getGithubAuthToken = (code: string) => {
  return fetch(`${MICROSERVICE.API}/auth?code=${code}`)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }: any) => {
      localStorage.setItem("accessToken", json["access_token"])
      return response.ok ? <any>camelizeKeys(json) : Promise.reject(json)
    })
    .then(
      (response: Response) => ({ ...response }),
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

function* watchLogout() {
  yield put(setPage('welcome'))
}

function* watchAuthRequest() {
  yield createAuthWindow()

  const authCode = yield call(getGithubAuthCode)
  const { code, error } = yield take(authCode)

  if (error) {
    yield put(createAlert({
      type: 'error',
      dismissable: true,
      message:  "Oops! Something went wrong and we couldn't log you in using Github. Please try again."
    }))

    return
  }

  const auth = yield call(getGithubAuthToken, code)

  yield put(receiveAuth(auth))
}

function* watchAuthSuccess() {
  yield put(requestProfile())
}

export default function* authSaga() {
  yield takeEvery(AUTH.LOGOUT, watchLogout)
  yield takeEvery(AUTH.REQUEST, watchAuthRequest)
  yield takeEvery(AUTH.SUCCESS, watchAuthSuccess)
}
