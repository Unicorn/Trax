import { Credentials } from "google-auth-library";
import { RootState } from "./app";

export enum GOOGLE_AUTH {
  REQUEST = 'trax/google/auth/REQUEST',
  SUCCESS = 'trax/google/auth/SUCCESS',
  FAILURE = 'trax/google/auth/FAILURE',
  REFRESH = 'trax/google/auth/REFRESH',
  LOGOUT = 'trax/google/auth/LOGOUT',
  SET_KEY = 'trax/google/auth/SET_KEY',
  SET_SECRET = 'trax/google/auth/SET_SECRET',
  SET_CODE = 'trax/google/auth/SET_CODE',
  SET_TOKEN = 'trax/google/auth/SET_TOKEN',
}

export enum GOOGLE_TIMESHEET {
  GET_SHEETS = 'trax/google/timesheet/GET_SHEETS',
  SET_ID = 'trax/google/timesheet/SET_ID',
}

export interface GoogleAuth {
  key?: string
  secret?: string
  code?: string
  token?: Credentials
}

export interface GoogleTimesheet {
  id?: string
}

export interface Google {
  auth: GoogleAuth
  timesheet: GoogleTimesheet
}

export interface GoogleAuthAction {
  type: GOOGLE_AUTH,
  payload?: GoogleAuth
}

export interface GoogleTimesheetAction {
  type: GOOGLE_TIMESHEET,
  payload?: GoogleTimesheet
}

export interface GoogleAction {
  type: GOOGLE_AUTH | GOOGLE_TIMESHEET
  payload?: Google
}

export const googleState: Google = {
  auth: {
    key: '',
    secret: '',
    code: '',
  },
  timesheet: {
    id: ''
  }
}

export const getGoogleAuth = (state: RootState): GoogleAuth => state.google.auth