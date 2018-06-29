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

export type Repos = Repo[]

export interface ReposAction {
  type: typeof REPO.REQUEST | typeof REPO.SUCCESS | typeof REPO.FAILURE
  payload?: Repos
  login?: string
}
