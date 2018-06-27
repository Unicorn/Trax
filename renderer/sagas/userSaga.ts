import { eventChannel } from 'redux-saga'
import { put, call, take, takeEvery } from 'redux-saga/effects'
import { receiveGithubAuth } from 'controllers/userController'
import { createAlert } from 'controllers/alertController'
import { USER } from 'models/user'
import { GITHUB } from 'config/constants'

const createAuthWindow = () => {
  // Build the OAuth consent page URL
  const win = new window.BrowserWindow({
    width: 600,
    height: 750,
    show: false,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      nodeIntegration: false,
    },
  })

  const githubUrl = `${GITHUB.HOST}/login/oauth/authorize?`
  const authUrl = `${githubUrl}client_id=${GITHUB.CLIENT_ID}&scope=${GITHUB.SCOPE}`

  console.log("authUrl", authUrl)

  win.loadURL(authUrl)

  window.authWindow = win
}

const authResponse = (rawURL: string): any => {
  const url = new URL(rawURL)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  console.log("authResponse", code, error)

  return { code, error }
}

const winEvents = () => {
  const contents = window.authWindow.webContents

  return eventChannel(emit => {
    contents.on('did-fail-load', (_e: Event, _errCode: number, error: string, url: string) => {
      if (url.includes(GITHUB.HOST)) {
        console.log(`Invalid Hostname - ${_errCode}`, `Could not load ${GITHUB.HOST}. ${error}`)
        emit({ error })
      }
    })

    contents.on('will-navigate', (_e: Event, url: string) => {
      console.log("will-navigate")
      const { code, error } = authResponse(url)

      if (!code || error)
        window.authWindow.show()

      emit(authResponse(url))
    })

    contents.on('did-get-redirect-request', (_e: Event, _old: string, url: string) => {
      console.log("did-get-redirect")
      const { code, error } = authResponse(url)

      if (!code || error)
        window.authWindow.show()

      return emit({ code, error })
    })

    return () => {
      console.log("destroying window")
      window.authWindow.destroy()
    }
  })
}

function* doAuthentication() {
  yield createAuthWindow()

  const winChan = yield call(winEvents)

  while (true) {
    const { code, error } = yield take(winChan)

    console.log("fetchProfile", code, error)

    if (code && !error) {
      localStorage.setItem('githubToken', code)
      yield put(receiveGithubAuth({ code, error }))
    }

    if (error)
      yield put(createAlert({
        type: 'error',
        dismissable: true,
        message:  "Oops! Something went wrong and we couldn't log you in using Github. Please try again."
      }))
  }
}

export default function* profileSaga() {
  yield takeEvery(USER.GITHUB_AUTH.REQUEST, doAuthentication)
}
