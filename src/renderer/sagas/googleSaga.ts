import { google, sheets_v4 } from 'googleapis' // eslint-disable-line @typescript-eslint/camelcase
import { GaxiosResponse } from 'gaxios'
import { put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { call, select } from 'horseshoes'
import { setSheetValidId, setSheetSheets, receiveAuth } from '@/controllers/googleController'
import {
  GOOGLE_AUTH,
  GoogleAuth,
  getGoogleAuth,
  GOOGLE_TIMESHEET,
  GoogleTimesheetAction,
  GoogleTimesheet,
  getGoogleTimesheet
} from '@/models/google'
import { authorizeApp, getToken } from '@/helpers/authHelper'
import { MICROSERVICE } from '@/config/constants'

type Spreadsheet = GaxiosResponse<sheets_v4.Schema$Spreadsheet> // eslint-disable-line @typescript-eslint/camelcase
type AddRow = GaxiosResponse<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> // eslint-disable-line @typescript-eslint/camelcase

const sheets = google.sheets('v4')

const createGoogleClient = ({ accessToken, refreshToken, tokenType }: GoogleAuth): void => {
  window.googleClient = new google.auth.OAuth2()
  accessToken &&
    window.googleClient.setCredentials({
      access_token: accessToken, // eslint-disable-line @typescript-eslint/camelcase
      refresh_token: refreshToken, // eslint-disable-line @typescript-eslint/camelcase
      token_type: tokenType // eslint-disable-line @typescript-eslint/camelcase
    })
}

const checkSheetAccess = ({ spreadsheetId }: GoogleTimesheet): Promise<Spreadsheet> =>
  new Promise((resolve, reject) => {
    const request = {
      auth: window.googleClient,
      spreadsheetId,
      ranges: []
    }

    sheets.spreadsheets.get(request, (err: Error | null, res?: Spreadsheet | null) => {
      return res && !err ? resolve(res) : reject(err)
    })
  })

const addRowToSheet = ({ spreadsheetId, sheetId }: GoogleTimesheet): Promise<AddRow> =>
  new Promise((resolve, reject) => {
    const request = {
      auth: window.googleClient,
      spreadsheetId,
      requestBody: {
        requests: [
          {
            insertDimension: {
              inheritFromBefore: false,
              range: {
                sheetId,
                startIndex: 1,
                endIndex: 2,
                dimension: 'ROWS'
              }
            }
          },
          {
            pasteData: {
              data: '=TODAY(), =NOW()',
              type: 'PASTE_NORMAL',
              delimiter: ',',
              coordinate: {
                sheetId,
                rowIndex: 1,
                columnIndex: 0
              }
            }
          }
        ]
      }
    }

    console.log('request', request)

    sheets.spreadsheets.batchUpdate(request, (err: Error | null, res?: AddRow | null) => {
      return res && !err ? resolve(res) : reject(err)
    })
  })

function* watchAuthRequest(): SagaIterator {
  try {
    const authUrl = `${MICROSERVICE.API}${MICROSERVICE.GOOGLE.AUTH}`
    const tokenUrl = `${MICROSERVICE.API}${MICROSERVICE.GOOGLE.AUTH}`
    const filter = `${MICROSERVICE.API}${MICROSERVICE.GOOGLE.AUTH}*`
    const code = yield* call(authorizeApp, authUrl, filter)
    const token = yield* call(getToken, tokenUrl, code)

    token.accessToken && localStorage.setItem('google.accessToken', token.accessToken)

    yield put(receiveAuth(token))
  } catch (error) {
    console.log('Error in googleSaga: watchAuthRequest', error)
  }
}

function* watchSetSpreadsheetId({ payload }: GoogleTimesheetAction): SagaIterator {
  if (!payload || !payload.spreadsheetId) return

  try {
    const credentials = yield* select(getGoogleAuth)
    yield* call(createGoogleClient, credentials)

    const response = yield* call(checkSheetAccess, payload)
    yield put(setSheetValidId(response && response.status === 200))
    yield put(setSheetSheets(response.data.sheets || []))
  } catch (error) {
    console.log('Error in watchSheetsRequest', error)
  }
}

function* watchSetSheet(): SagaIterator {
  try {
    const credentials = yield* select(getGoogleAuth)
    yield* call(createGoogleClient, credentials)

    const timesheet = yield* select(getGoogleTimesheet)
    const response = yield* call(addRowToSheet, timesheet)

    console.log('response', response)
  } catch (error) {
    console.log('Error in watchSetSheet', error)
  }
}

export default function* googleSaga(): SagaIterator {
  yield takeLatest(GOOGLE_AUTH.REQUEST, watchAuthRequest)
  yield takeLatest(GOOGLE_TIMESHEET.SET_SPREADSHEET_ID, watchSetSpreadsheetId)
  yield takeLatest('TODO: listen to create invoices', watchSetSheet)
}
