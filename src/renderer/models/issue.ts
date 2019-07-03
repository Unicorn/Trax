import { Resources, Resource, normalizePayload } from './app'
import { User } from '@/models/user'
import { Labels } from '@/models/label'
import { LANES, Lane } from '@/config/constants'

/**
 * Core Definitions
 **/
export enum ISSUES {
  REQUEST_START = 'trax/issues/request/start',
  REQUEST_SUCCESS = 'trax/issues/request/success',
  UPDATE = 'trax/issues/update'
}

export enum ISSUE {
  CREATE = 'trax/issue/create',
  CREATE_REQUEST = 'trax/issue/create/request',
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

/**
 * ACTIONS and Action Types
 **/
export interface CreateIssuePayload {
  owner: string
  repo: string
  title: string
  body?: string
  assignee?: string
  milestone?: number
  labels?: string[]
  assignees?: string[]
}

export interface CreateIssueAction {
  type: ISSUE
  payload: CreateIssuePayload
}

export interface IssueAction {
  type: ISSUES | ISSUE
  payload?: Issue[] | Issue
}

/**
 * Normalizers and Helper Functions
 **/
export const normalizeIssue = (issue: Issue): Issue => {
  const labels = issue.labels && issue.labels.filter(l => LANES.includes(l.name as Lane))
  const lane: Lane = labels && labels.length > 0 ? (labels[0].name as Lane) : 'backlog'
  return normalizePayload({ ...issue, lane }) as Issue
}
