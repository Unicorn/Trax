import { FetchedItems } from 'models'

export enum REPO {
  REQUEST = 'trax/github/repo/REQUEST',
  SUCCESS = 'trax/github/repo/SUCCESS',
  FAILURE = 'trax/github/repo/FAILURE'
}

export interface Repo {
  login: string
  id: string
  nodeId: string
  fullName: string
  htmlUrl: string
}

export interface Repos extends FetchedItems {
  entities: {
    repos: {
      [key: string]: Repo
    }
  }
}

export interface ReposAction {
  type: REPO
  payload?: Repos
  login?: string
}

export const defaultRepoState: Repos = {
  isLoading: false,
  result: [],
  entities: {
    repos: {}
  }
}
