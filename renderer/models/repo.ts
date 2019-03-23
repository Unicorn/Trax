import { Resources, Resource } from './app'

export enum REPOS {
  UPDATE = 'trax/repos/update'
}

export interface Repo extends Resource {
  login: string
  id: string
  nodeId: string
  fullName: string
  htmlUrl: string
}

export interface Repos extends Resources {
  data: {
    [key: string]: Repo
  }
}

export interface UpdateReposAction {
  type: REPOS
  payload?: Repo[]
}

export type RepoActions = UpdateReposAction
