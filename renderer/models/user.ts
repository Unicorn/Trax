export const USER = {
  GITHUB: {
    AUTH: {
      REQUEST: 'trax/github/auth/REQUEST',
      SUCCESS: 'trax/github/auth/SUCCESS',
      FAILURE: 'trax/github/auth/FAILURE'
    },
    PROFILE: {
      REQUEST: 'trax/github/profile/REQUEST',
      SUCCESS: 'trax/github/profile/SUCCESS',
      FAILURE: 'trax/github/profile/FAILURE'
    }
  }
}

export interface GithubAuth {
  code?: string | null
  error?: string | null
}

export interface GithubProfile {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  name: string
  email: string
}

export type User = {
  githubAuth?: GithubAuth
  githubProfile?: GithubProfile
}

export type AuthActionTypes = typeof USER.GITHUB.AUTH.REQUEST | typeof USER.GITHUB.AUTH.SUCCESS
export type UserActionTypes = typeof USER.GITHUB.PROFILE.REQUEST | typeof USER.GITHUB.PROFILE.SUCCESS

export interface UserAction {
  type: AuthActionTypes | UserActionTypes
  payload?: User
}
