import { createActionName, GithubActions } from 'helpers/reduxHelper'
import { Users, User } from 'models/user'
import { Labels } from 'models/label'
import { Milestone } from 'models/milestone'
import { Lane } from 'config/constants'

export const ISSUE = Object.assign({},
  createActionName('ISSUE', 'CREATE'),
  createActionName('ISSUE', 'LIST'),
  createActionName('ISSUE', 'UPDATE')
)

export interface Issue {
  ident: string
  lane: Lane
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

export interface CreateIssue {
  title: string
  body: string
  milestone: number
  labels: [string]
  assignees: [string]
}

export interface ReceiveIssue {
  isLoading: boolean
  result: number
  entities: {
    issues: {
      [key: number]: Issue
    }
  }
}

export interface Issues {
  isLoading: boolean
  result?: [number]
  nextPageUrl?: string
  entities: {
    issues: {
      [key: number]: Issue
    }
  }
}

export interface IssuesAction {
  type: GithubActions
  payload?: Issues | Issue | ReceiveIssue | CreateIssue
  ident?: string
  from?: string
  to?: string
}

export const defaultState = {
  isLoading: false,
  entities: {
    issues: {}
  }
}
