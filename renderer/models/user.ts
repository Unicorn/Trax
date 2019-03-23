import { Resource } from './app'

export enum USERS {
  UPDATE = 'trax/users/update'
}

export interface User extends Resource {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  gravatarId: string
  url: string
  htmlUrl: string
  followersUrl: string
  followingUrl: string
  gistsUrl: string
  starredUrl: string
  subscriptionsUrl: string
  organizationsUrl: string
  reposUrl: string
  eventsUrl: string
  receivedEventsUrl: string
  type: string
  siteAdmin: boolean
}

export interface UpdateUsersAction {
  type: USERS
  payload?: User[]
}
