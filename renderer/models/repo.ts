import { GithubServiceRequest } from 'models/github'

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

export interface ReposAction {
  type: typeof REPO.REQUEST | typeof REPO.SUCCESS | typeof REPO.FAILURE
  payload?: Repo[]
  login?: string
}

export interface Repos extends GithubServiceRequest {
  entities: Repo[]
}

export const defaultState = {
  isLoading: false,
  entities: []
}
