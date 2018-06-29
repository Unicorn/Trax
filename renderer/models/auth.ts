export const AUTH = {
  LOGOUT: 'trax/user/logout',
  REQUEST: 'trax/github/auth/REQUEST',
  SUCCESS: 'trax/github/auth/SUCCESS',
  FAILURE: 'trax/github/auth/FAILURE'
}

export interface Auth {
  accessToken?: string
  tokenType?: string
  expiry?: string
}

export interface AuthAction {
  type: typeof AUTH.LOGOUT | typeof AUTH.REQUEST | typeof AUTH.SUCCESS | typeof AUTH.FAILURE
  payload?: Auth
}
