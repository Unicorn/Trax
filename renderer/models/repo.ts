export const REPO = {
  REQUEST: 'trax/github/repo/REQUEST',
  SUCCESS: 'trax/github/repo/SUCCESS',
  FAILURE: 'trax/github/repo/FAILURE'
}

export interface Repo {
  login: string
  id: number
  nodeId: string
  fullName: string
  htmlUrl: string
}

export interface Repos {
  isLoading: boolean
  entities?: {
    repos: {
      [key: number]: Repo
    }
  }
  result?: [number]
  nextPageUrl?: string
}

export interface ReposAction {
  type: typeof REPO.REQUEST | typeof REPO.SUCCESS | typeof REPO.FAILURE
  payload?: Repos
  login?: string
}

export const defaultState = {
  isLoading: false,
}
