import * as Octokit from '@octokit/rest'
import { ISSUE, Issue } from '@/models/issue'
import { Lane } from '@/config/constants'

export const octokit = new Octokit({
  auth() {
    return `token ${localStorage.getItem('accessToken') || ''}`
  },
  userAgent: 'octokit/rest.js v1.2.3',
  previews: [],
  baseUrl: 'https://api.github.com',
  log: {
    debug: console.log,
    info: console.log,
    warn: console.warn,
    error: console.error
  },
  request: {
    // request timeout in ms. 0 means no timeout
    timeout: 0
  }
})

export const GITHUB = {
  ISSUES: {
    REQUEST: 'trax/github/issues/request',
    SUCCESS: 'trax/github/issues/success'
  },
  ISSUE: {
    REQUEST: 'trax/github/issue/request'
  },
  ORGS: {
    REQUEST: 'trax/github/orgs/request'
  },
  REPOS: {
    REQUEST: 'trax/github/repos/request'
  },
  USERS: {
    REQUEST: 'trax/github/users/request'
  }
}

export const getOrgs = (): { type: string } => ({
  type: GITHUB.ORGS.REQUEST
})

export const getIssues = (): { type: string } => ({
  type: GITHUB.ISSUES.REQUEST
})

export const receivedIssues = (): { type: string } => ({
  type: GITHUB.ISSUES.SUCCESS
})



export interface GetReposForLogin {
  type: string
  login: string
  key: string
}

export const getReposForLogin = (login: string, key: string): GetReposForLogin => ({
  type: GITHUB.REPOS.REQUEST,
  login,
  key
})

export interface UpdateIssueLaneAction {
  type: ISSUE
  payload: Issue
  to: Lane
}

export const updateIssueLane = (payload: Issue, to: Lane): UpdateIssueLaneAction => ({
  type: ISSUE.UPDATE_LANE,
  payload,
  to
})
