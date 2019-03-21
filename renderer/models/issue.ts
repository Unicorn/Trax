import { Resources, Resource, normalizePayload } from './app'
import { User } from 'models/user'
import { Labels } from 'models/label'
import { LANES, Lane } from 'config/constants'

export enum ISSUES {
  UPDATE = 'trax/issues/update'
}

export enum ISSUE {
  UPDATE = 'trax/issue/update',
  UPDATE_LANE = 'trax/issue/update_lane'
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

export interface Issues extends Resources {
  data: {
    [key: string]: Issue
  }
}

export interface IssueAction {
  type: ISSUES | ISSUE
  payload: Issue[] | Issue
}

export const normalizeIssue = (issue: Issue): Issue => {
  const labels = issue.labels.filter(l => LANES.includes(l.name as Lane))
  const lane: Lane = labels.length > 0 ? (labels[0].name as Lane) : 'backlog'
  return normalizePayload({ ...issue, lane })
}
