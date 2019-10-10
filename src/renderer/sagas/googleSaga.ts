import { google } from 'googleapis'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { select } from 'horseshoes'
import { GOOGLE_AUTH, GoogleAuth, getGoogleAuth, GOOGLE_TIMESHEET, GoogleTimesheetAction } from '@/models/google'
import { setAuthCode, setAuthToken } from '@/controllers/googleController'

const { BrowserWindow } = require('electron').remote

const createGoogleClient = ({ key, secret, token }: GoogleAuth): void => {
  window.googleClient = new google.auth.OAuth2(key, secret, 'urn:ietf:wg:oauth:2.0:oob')
  token && window.googleClient.setCredentials(token)
}

const authorizeApp = (): Promise<any> => new Promise((resolve, reject) => {
  // Build the OAuth consent page URL
  const win = new BrowserWindow({
    width: 600,
    height: 750,
    show: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false
    }
  })

  const authUrl = window.googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  win.loadURL(authUrl)

  const filter = { urls: [`https://accounts.google.com/o/oauth2/approval/v2*`] }

  win.webContents.session.webRequest.onBeforeRequest(filter, (details, _callback) => {
    const components = details.url.split('=')

    if (!components[4]) return reject(new Error(`Could not extract code from url: ${details.url}`))

    win.close()
    resolve(decodeURIComponent(components[4]))
  })
})

const updateToken = (code: string) => new Promise((resolve, reject) => {
  window.googleClient.getToken(code, (err, token) => {
    if (err || !token)
      return reject(new Error(`Failed to get token from Google: ${err ? err.message : 'unknown error'}`))

    window.googleClient.setCredentials(token)
    resolve(token)
  })
})


function* watchAuthRequest(): SagaIterator {
  try {
    const credentials = yield* select(getGoogleAuth)
    yield call(createGoogleClient, credentials)

    const code = yield call(authorizeApp)
    yield put(setAuthCode(code))

    const token = yield call(updateToken, code)
    yield put(setAuthToken(token))

  } catch (error) {
    console.log("Error in watchAuthRequest", error)
  }
}

function* watchSheetSelection({ payload }: GoogleTimesheetAction): SagaIterator {
  if (!payload || !payload.id) return

  try {
    const credentials = yield* select(getGoogleAuth)
    yield call(createGoogleClient, credentials)

    const sheets = google.sheets('v4')

    const request = {
      // The ID of the spreadsheet to retrieve data from.
      spreadsheetId: payload.id,

      // The A1 notation of the values to retrieve.
      range: 'Clay',  // TODO: Update placeholder value.

      // How values should be represented in the output.
      // The default render option is ValueRenderOption.FORMATTED_VALUE.
      // valueRenderOption: '',  // TODO: Update placeholder value.

      // How dates, times, and durations should be represented in the output.
      // This is ignored if value_render_option is
      // FORMATTED_VALUE.
      // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
      // dateTimeRenderOption: '',  // TODO: Update placeholder value.

      auth: window.googleClient,
    };

    sheets.spreadsheets.values.get(request, (err: any, response: any) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Response in getting sheet', response)
    });
  } catch (error) {
    console.log("Error in watchSheetsRequest", error)
  }
}

export default function* googleSaga(): SagaIterator {
  yield takeLatest(GOOGLE_AUTH.REQUEST, watchAuthRequest)
  yield takeLatest(GOOGLE_TIMESHEET.SET_ID, watchSheetSelection)
}