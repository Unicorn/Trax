import { FetchedItems } from 'models'
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

export interface CreateIssueRequest {
  title: string
  body: string
  labels: string[]
  assignees: string[]
  milestone?: number
}

export interface IssuesSchema extends FetchedItems {
  entities: {
    issues: {
      [key: string]: Issue
    }
  }
}

export interface IssuesAction {
  type: GithubActions
  payload?: IssuesSchema | Issue | CreateIssueRequest
  ident?: string
  from?: string
  to?: string
}

export const defaultState: IssuesSchema = {
  isLoading: false,
  result: [],
  entities: {
    issues: {}
  }
}
