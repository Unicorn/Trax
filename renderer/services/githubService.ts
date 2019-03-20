import * as _ from 'lodash'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { scheme } from 'models'
import { GITHUB } from 'config/constants'

interface Request {
  headers?: any
  body?: any
  method?: string
  params?: any
}

// Fetches an API response and normalizes the result JSON according to scheme.
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

      return <any>_.merge({ ...request.params }, normalize(camelizedJson, schema))
    })
    .then(
      (response: Response) => response,
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

// api services
export const fetchProfile = () => github('user')
export const fetchCreateLabel = (ident: string, request: any) => github(`repos/${ident}/labels`, request)
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

  return github(`repos/${owner}/${repo}/issues`, options, scheme.issues)
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

  return github(`repos/${owner}/${repo}/issues`, options, scheme.issue)
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

  return github(`repos/${owner}/${repo}/issues/${number}`, options, scheme.issue)
}
