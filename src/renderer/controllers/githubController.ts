import { GITHUB_AUTH, GithubAuth, GithubAction } from '@/models/github'

export const requestAuth = (): GithubAction => ({
  type: GITHUB_AUTH.REQUEST
})

export const receiveAuth = (payload: GithubAuth): GithubAction => ({
  type: GITHUB_AUTH.SUCCESS,
  payload
})

export const logout = (): GithubAction => ({
  type: GITHUB_AUTH.LOGOUT
})

export const githubReducer = (state: GithubAuth = {}, action: GithubAction): GithubAuth => {
  const { payload, type } = action

  switch (type) {
    case GITHUB_AUTH.LOGOUT:
      return {}

    case GITHUB_AUTH.SUCCESS:
      return { ...state, ...payload }

    default:
      return state
  }
}
