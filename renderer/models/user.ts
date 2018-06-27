export const USER = {
  GITHUB_AUTH: {
    REQUEST: 'trax/profile/REQUEST',
    SUCCESS: 'trax/profile/SUCCESS',
    FAILURE: 'trax/profile/FAILURE'
  }
}

export interface GithubAuth {
  code: string | null
  error: string | null
}

export type User = {
  githubAuth?: GithubAuth
}

export interface UserAction {
  type: typeof USER.GITHUB_AUTH.REQUEST | typeof USER.GITHUB_AUTH.SUCCESS | typeof USER.GITHUB_AUTH.FAILURE
  payload?: User
}
