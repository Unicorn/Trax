import { Resource } from './app'
import { Repo } from './repo'

export enum ORGS {
  UPDATE = 'trax/orgs/update'
}

export enum ORG {
  UPDATE_REPOS = 'trax/org/update/repos'
}

export interface Org extends Resource {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  name: string
  htmlUrl: string
  repoIds?: string[]
}

export interface UpdateOrgsAction {
  type: ORGS
  payload: Org[]
}

export interface UpdateOrgPayload {
  key: string
  data: Repo[]
}

export interface UpdateOrgAction {
  type: ORG
  payload: UpdateOrgPayload
}

export type OrgActions = UpdateOrgAction | UpdateOrgsAction
