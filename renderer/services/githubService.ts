import { schema, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { GITHUB } from 'config/constants'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const github = (endpoint: any, schema: any, options: any): Promise<any> => {
  const url = (endpoint.indexOf(GITHUB.API) === -1) ? GITHUB.API + endpoint : endpoint
  const request = {
    headers: {
      Authorization: `token ${options.code}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options
  }

  console.log('github request', request)

  return fetch(url, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }: any) => {
      if (!response.ok)
        return Promise.reject(json)

      const camelizedJson = camelizeKeys(json)

      return <any>Object.assign({}, normalize(camelizedJson, schema))
    })
    .then(
      (response: Response) => ({ response }),
      (error: Error) => ({error: error.message || 'Something bad happened'})
    )
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// Schemas for Github API responses.
const userSchema = new schema.Entity('users', undefined, {
  idAttribute: 'login'
})

const repoSchema = new schema.Entity('repos', undefined, {
  idAttribute: 'fullName'
})

repoSchema.define({
  owner: userSchema
})

// api services
export const fetchUser = (options: any) => {
  console.log("fetchUser", options)
  return github('user', userSchema, options)
}
