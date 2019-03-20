import { Resource } from './app'
import { User } from 'models/user'
import { Labels } from 'models/label'
import { Lane } from 'config/constants'

export enum ISSUES {
  UPDATE = 'trax/issues/update'
}

export interface Issue extends Resource {
  ident: string
  lane: Lane
  id: string
  nodeId: string
  url: string
  repositoryUrl: string
  labelsUrl: string
  commentsUrl: string
  eventsUrl: string
  htmlUrl: string
  number: number
  state: string
  title: string
  body: string
  user: User
  labels: Labels
  locked: boolean
  activeLockReason: string
  comments: number
  pullRequest: {
    url: string
    htmlUrl: string
    diffUrl: string
    patchUrl: string
  }
  closedAt: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface UpdateIssuesAction {
  type: ISSUES
  payload: Issue[]
}
