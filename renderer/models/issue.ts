import { Labels } from 'models/label'
import { Users, User } from 'models/user'
import { Milestone } from 'models/milestone'

export const ISSUE = {
  REQUEST: 'trax/github/issues/REQUEST',
  SUCCESS: 'trax/github/issues/SUCCESS',
  FAILURE: 'trax/github/issues/FAILURE'
}

export interface Issue {
  ident: string
  id: number
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
  assignee: User
  assignees: Users
  milestone: Milestone
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

export type Issues = Issue[]

export interface IssuesAction {
  type: typeof ISSUE.REQUEST | typeof ISSUE.SUCCESS | typeof ISSUE.FAILURE
  payload?: Issues
  login?: string
}
