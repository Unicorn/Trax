import { Credentials } from 'google-auth-library'
import { GOOGLE_AUTH, GOOGLE_TIMESHEET, Google, GoogleAction, GoogleAuthAction, GoogleTimesheetAction, googleState } from '@/models/google'

export const requestAuth = (): GoogleAuthAction => ({
  type: GOOGLE_AUTH.REQUEST
})

export const refreshAuthToken = (): GoogleAuthAction => ({
  type: GOOGLE_AUTH.REFRESH
})

export const logout = (): GoogleAuthAction => ({
  type: GOOGLE_AUTH.LOGOUT
})

export const setAuthKey = (key: string): GoogleAuthAction => ({
  type: GOOGLE_AUTH.SET_KEY,
  payload: { key }
})

export const setAuthSecret = (secret: string): GoogleAuthAction => ({
  type: GOOGLE_AUTH.SET_SECRET,
  payload: { secret }
})

export const setAuthCode = (code: string): GoogleAuthAction => ({
  type: GOOGLE_AUTH.SET_CODE,
  payload: { code }
})

export const setAuthToken = (token: Credentials): GoogleAuthAction => ({
  type: GOOGLE_AUTH.SET_TOKEN,
  payload: { token }
})

export const getSheets = (): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.GET_SHEETS
})

export const setSheetId = (id: string): GoogleTimesheetAction => ({
  type: GOOGLE_TIMESHEET.SET_ID,
  payload: { id }
})

export const googleReducer = (state: Google = googleState, action: GoogleAction): Google => {
  const { payload, type } = action

  switch (type) {
    case GOOGLE_AUTH.SET_KEY:
    case GOOGLE_AUTH.SET_SECRET:
    case GOOGLE_AUTH.SET_CODE:
    case GOOGLE_AUTH.SET_TOKEN:
      return { ...state, auth: { ...state.auth, ...payload } }

    case GOOGLE_TIMESHEET.SET_ID:
      return { ...state, timesheet: { ...state.timesheet, ...payload } }

    case GOOGLE_AUTH.LOGOUT:
      return googleState

    default:
      return state
  }
}
