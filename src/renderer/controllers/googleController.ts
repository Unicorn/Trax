import {
  GOOGLE_AUTH,
  GOOGLE_TIMESHEET,
  Google,
  GoogleAuth,
  GoogleAction,
  GoogleAuthAction,
  GoogleTimesheetAction,
  googleState
} from '@/models/google'
import { sheets_v4 } from 'googleapis' // eslint-disable-line @typescript-eslint/camelcase

export const requestAuth = (): GoogleAuthAction => ({
  type: GOOGLE_AUTH.REQUEST
})

export const receiveAuth = (payload: GoogleAuth): GoogleAuthAction => ({
  type: GOOGLE_AUTH.SUCCESS,
  payload
})

export const logout = (): GoogleAuthAction => ({
  type: GOOGLE_AUTH.LOGOUT
})

export const getSheets = (): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.GET_SHEETS
})

export const setSpreadsheetId = (spreadsheetId: string): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.SET_SPREADSHEET_ID,
  payload: { spreadsheetId }
})

export const setSheet = (sheetId: number, sheetName: string): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.SET_SHEET,
  payload: { sheetId, sheetName }
})

export const setSheetValidId = (validId: boolean): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.SET_VALID_ID,
  payload: { validId }
})

// eslint-disable-next-line @typescript-eslint/camelcase
export const setSheetSheets = (sheets: sheets_v4.Schema$Sheet[]): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.SET_SHEETS,
  payload: { sheets }
})

export const googleReducer = (state: Google = googleState, action: GoogleAction): Google => {
  const { payload, type } = action

  switch (type) {
    case GOOGLE_AUTH.SUCCESS:
      return { ...state, auth: { ...state.auth, ...payload } }

    case GOOGLE_AUTH.LOGOUT:
      return googleState

    case GOOGLE_TIMESHEET.SET_SPREADSHEET_ID:
    case GOOGLE_TIMESHEET.SET_VALID_ID:
    case GOOGLE_TIMESHEET.SET_SHEET:
    case GOOGLE_TIMESHEET.SET_SHEETS:
      return { ...state, timesheet: { ...state.timesheet, ...payload } }

    default:
      return state
  }
}
