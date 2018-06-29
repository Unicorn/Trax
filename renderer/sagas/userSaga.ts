import { eventChannel, END } from 'redux-saga'
import { put, call, take, takeEvery } from 'redux-saga/effects'
import { camelizeKeys } from 'humps'
import { receiveGithubAuth } from 'controllers/userController'
import { createAlert } from 'controllers/alertController'
import { setPage } from 'controllers/settingController'
import { fetchUser } from 'services/githubService'
import { randString } from 'helpers/stringHelper'
import { USER } from 'models/user'
import { GITHUB, MICROSERVICE } from 'config/constants'

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
      if (url.includes(GITHUB.HOST)) {
        console.log(`Invalid Hostname - ${_errCode}`, `Could not load ${GITHUB.HOST}. ${error}`)
        emit({ error })
      }
    })

    contents.on('did-get-redirect-request', (_e: Event, _old: string, url: string) => {
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
      if (!response.ok)
        return Promise.reject(json)

      return <any>camelizeKeys(json)
    })
    .then(
      (response: Response) => ({ ...response }),
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

function* watchLogout() {
  yield put(setPage('welcome'))
}

function* watchGithubAuth() {
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

  const authToken = yield call(getGithubAuthToken, code)

  console.log("authToken", authToken)

  // while (true) {
  //   const { code, error } = yield take(winChan)
  //
  //   console.log("fetchProfile", code, error)
  //
  //   if (code && !error) {
  //     localStorage.setItem('githubToken', code)
  //     yield put(receiveGithubAuth({ code, error }))
  //   }
  // }
}

function* watchGithubProfile(action: any) {
  const { code } = action.payload.githubAuth

  console.log("watchGithubProfile", code)

  yield call(fetchUser, { code })
}

export default function* userSaga() {
  yield takeEvery(USER.LOGOUT, watchLogout)
  yield takeEvery(USER.GITHUB.AUTH.REQUEST, watchGithubAuth)
  yield takeEvery(USER.GITHUB.PROFILE.REQUEST, watchGithubProfile)
}
