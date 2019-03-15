import { FetchedDataSchema } from 'config/schema'

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

export interface Repos extends FetchedDataSchema {
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

export const defaultState: Repos = {
  isLoading: false,
  result: [],
  entities: {
    repos: {}
  }
}
