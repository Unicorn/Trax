import { AUTH, Auth, AuthAction } from 'models/auth'

export const requestAuth = (): AuthAction => ({
  type: AUTH.REQUEST,
})

export const receiveAuth = (payload: Auth): AuthAction => ({
  type: AUTH.SUCCESS,
  payload
})

export const logout = (): AuthAction => ({
  type: AUTH.LOGOUT
})


export const authReducer = (state: Auth = {}, action: AuthAction): Auth => {
  const { payload, type } = action

  switch (type)
  {
    case AUTH.LOGOUT :
      return {}

    case AUTH.SUCCESS :
      console.log(AUTH.SUCCESS)
      return { ...state, ...payload }

    default :
      return state
  }
}
