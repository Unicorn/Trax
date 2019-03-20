import * as Octokit from '@octokit/rest'

export const octokit = new Octokit({
  auth: `token ${localStorage.getItem("accessToken") || ''}`,
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
  ORGS: {
    REQUEST: 'trax/github/orgs/request'
  },
  REPOS: {
    REQUEST: 'trax/github/repos/request'
  }
}

export const getOrgs = () => ({
  type: GITHUB.ORGS.REQUEST
})

export interface GetReposForLogin {
  type: string,
  login: string
  key: string
}

export const getReposForLogin = (login: string, key: string): GetReposForLogin => ({
  type: GITHUB.REPOS.REQUEST,
  login,
  key
})
