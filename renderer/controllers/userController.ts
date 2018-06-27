import { USER, GithubAuth, User, UserAction } from 'models/user'

export const requestGithubAuth = (): UserAction => ({
  type: USER.GITHUB_AUTH.REQUEST,
})

export const receiveGithubAuth = (payload: GithubAuth): UserAction => ({
  type: USER.GITHUB_AUTH.SUCCESS,
  payload: { githubAuth: payload }
})

const defaultState = {
  githubAuth: {
    code: null,
    error: null
  }
}

export const userReducer = (state: User = defaultState, action: UserAction): User => {
  const { payload, type } = action

  if (!payload || !type) return state

  switch (type)
  {
    case USER.GITHUB_AUTH.SUCCESS :
      console.log(USER.GITHUB_AUTH.SUCCESS)
      return {
        ...state,
        githubAuth: payload.githubAuth
      }

    default :
      return state
  }
}
