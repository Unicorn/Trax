import * as _ from 'lodash'
import { camelizeKeys } from 'humps'
import { GITHUB } from 'config/constants'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const github = (endpoint: any, options?: any): Promise<any> => {
  const url = (endpoint.indexOf(GITHUB.API) === -1) ? GITHUB.API + endpoint : endpoint
  const request = _.merge({
    headers: {
      Authorization: `token ${localStorage.getItem("accessToken")}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }, options)

  if (options && options.body)
    request.body = JSON.stringify(options.body)

  console.log('github request', request)

  return fetch(url, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }: any) => response.ok ? <any>camelizeKeys(json) : Promise.reject(json))
    .then(
      (response: Response) => response,
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

// api services
export const fetchProfile = () => github('user')
export const fetchOrgs = () => github('user/orgs')
export const fetchRepos = (login?: string) => github(login ? `orgs/${login}/repos` : 'user/repos')
export const fetchCreateProject = ({ owner, repo }: any, request: any) => github(`repos/${owner}/${repo}/projects`, request)
export const fetchCreateLabel = ({ owner, repo }: any, request: any) => github(`repos/${owner}/${repo}/labels`, request)
export const fetchUnassignedIssues = ({ owner, repo }: any, request: any) => github(`repos/${owner}/${repo}/issues`, request)
export const fetchIssueUpdate = ({ owner, repo, number }: any, request: any) => github(`repos/${owner}/${repo}/issues/${number}`, request)
