import { RootState } from './app'
import { sheets_v4 } from 'googleapis' // eslint-disable-line @typescript-eslint/camelcase

export enum GOOGLE_AUTH {
  REQUEST = 'trax/google/auth/REQUEST',
  SUCCESS = 'trax/google/auth/SUCCESS',
  FAILURE = 'trax/google/auth/FAILURE',
  LOGOUT = 'trax/google/auth/LOGOUT'
}

export enum GOOGLE_TIMESHEET {
  GET_SHEETS = 'trax/google/timesheet/GET_SHEETS',
  SET_SPREADSHEET_ID = 'trax/google/timesheet/SET_SPREADSHEET_ID',
  SET_VALID_ID = 'trax/google/timesheet/SET_VALID_ID',
  SET_SHEET = 'trax/google/timesheet/SET_SHEET',
  SET_SHEETS = 'trax/google/timesheet/SET_SHEETS'
}

export interface GoogleAuth {
  accessToken?: string
  refreshToken?: string
  tokenType?: string
  expiry?: string
}

export interface GoogleTimesheet {
  spreadsheetId?: string
  validId?: boolean
  validName?: boolean
  sheets?: sheets_v4.Schema$Sheet[] // eslint-disable-line @typescript-eslint/camelcase
  sheetId?: number
  sheetName?: string
}

export interface Google {
  auth: GoogleAuth
  timesheet: GoogleTimesheet
}

export interface GoogleAuthAction {
  type: GOOGLE_AUTH
  payload?: GoogleAuth
}

export interface GoogleTimesheetAction {
  type: GOOGLE_TIMESHEET
  payload?: GoogleTimesheet
}

export interface GoogleAction {
  type: GOOGLE_AUTH | GOOGLE_TIMESHEET
  payload?: Google
}

export const googleState: Google = {
  auth: {},
  timesheet: {
    spreadsheetId: ''
  }
}

export const getGoogleAuth = (state: RootState): GoogleAuth => state.google.auth
export const getGoogleTimesheet = (state: RootState): GoogleTimesheet => state.google.timesheet
