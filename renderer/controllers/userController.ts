import { USER, GithubAuth, User, UserAction } from 'models/user'

export const requestGithubAuth = (): UserAction => ({
  type: USER.GITHUB.AUTH.REQUEST,
})

export const receiveGithubAuth = (payload: GithubAuth): UserAction => ({
  type: USER.GITHUB.AUTH.SUCCESS,
  payload: { githubAuth: payload }
})

export const requestGithubProfile = (payload: GithubAuth): UserAction => {
  console.log('requestGithubProfile action', payload)
  return {
  type: USER.GITHUB.PROFILE.REQUEST,
  payload: { githubAuth: payload }
}}

export const logout = (): UserAction => ({
  type: USER.LOGOUT
})

const defaultState = {
  githubAuth: {
    code: null,
    error: null
  }
}

export const userReducer = (state: User = defaultState, action: UserAction): User => {
  const { payload, type } = action

  switch (type)
  {
    case USER.LOGOUT :
      return defaultState

    case USER.GITHUB.AUTH.SUCCESS :
      console.log(USER.GITHUB.AUTH.SUCCESS)
      return { ...state, ...payload }

    case USER.GITHUB.PROFILE.SUCCESS :
      console.log(USER.GITHUB.PROFILE.SUCCESS, payload)

    default :
      return state
  }
}
