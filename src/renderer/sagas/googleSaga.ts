import { put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { call, select } from 'horseshoes'
import { setSheetValidId, setSheetSheets, receiveAuth } from '@/controllers/googleController'
import { GOOGLE_AUTH, getGoogleAuth, GOOGLE_TIMESHEET, GoogleTimesheetAction, getGoogleTimesheet } from '@/models/google'
import { authorizeApp, getToken } from '@/helpers/authHelper'
import { createGoogleClient, checkSheetAccess, addRowToSheet } from '@/helpers/googleHelper'
import { MICROSERVICE } from '@/config/constants'

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
