import * as _ from 'lodash'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import schema from 'config/schema'
import { GITHUB } from 'config/constants'

interface Request {
  headers?: any
  body?: any
  method?: string
  params?: any
}

const getNextPageUrl = (response: any) => {
  const link = response.headers.get('link')

  if (!link) return null

  const nextLink = link.split(',').find((s: Array<string>) => s.indexOf('rel="next"') > -1)

  if (!nextLink) return null

  return nextLink.split(';')[0].slice(1, -1)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const github = (endpoint: any, options?: any, schema?: any): Promise<any> => {
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

  return fetch(url, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }: any) => {
      if (!response.ok) return Promise.reject(json)

      const data = Array.isArray(json) ? json.map((c: any) => ({ ...request.params, ...c })) : json
      const camelizedJson = camelizeKeys(data)

      if (!schema)
        return <any>camelizedJson

      const nextPageUrl = getNextPageUrl(response)

      return <any>_.merge({ ...request.params }, normalize(camelizedJson, schema), { nextPageUrl })
    })
    .then(
      (response: Response) => response,
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

// api services
export const fetchProfile = () => github('user')
export const fetchOrgs = () => github('user/orgs')
export const fetchRepos = (login?: string) => github(login ? `orgs/${login}/repos` : 'user/repos', null, schema.repos)
export const fetchCreateProject = ({ owner, repo }: any, request: any) => github(`repos/${owner}/${repo}/projects`, request)
export const fetchCreateLabel = ({ owner, repo }: any, request: any) => github(`repos/${owner}/${repo}/labels`, request)
export const fetchRepoUsers = (ident: string) => github(`repos/${ident}/assignees`)
export const fetchRepoIssues = (ident: string) => github(`repos/${ident}/issues`)

export const fetchIssues = (request: Request) => {
  const { params: { owner, repo } } = request
  const options = {
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
    params: request.params
  }

  return github(`repos/${owner}/${repo}/issues`, options, schema.issues)
}

export const fetchIssueCreate = (request: Request) => {
  const { body, params: { owner, repo } } = request
  const options = {
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
    method: 'POST',
    body,
    params: request.params
  }

  return github(`repos/${owner}/${repo}/issues`, options, schema.issue)
}

export const fetchIssueUpdate = (request: Request) => {
  const { body, params: { owner, repo, number } } = request
  const options = {
    headers: {
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
    method: 'PATCH',
    body,
    params: request.params
  }

  return github(`repos/${owner}/${repo}/issues/${number}`, options, schema.issue)
}
