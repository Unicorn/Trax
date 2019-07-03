import { Resources, Resource } from 'horseshoes'

export enum REPOS {
  UPDATE = 'trax/repos/update'
}

export interface Repo extends Resource {
  login: string
  id: string
  nodeId: string
  fullName: string
  htmlUrl: string
  ownerId: string
}

export interface Repos extends Resources<Repo> {
  isLoading?: boolean
}

export interface UpdateReposAction {
  type: REPOS
  payload?: Repo[]
}

export type RepoActions = UpdateReposAction
