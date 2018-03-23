import reduxApi, { transformers } from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import { GITHUB } from 'config/constants'

const endpoints = {
  auth: {
    url: `${GITHUB.host}/login/oauth/access_token`,
    options: {
      method: 'POST',
    },
    transformer(data) {
      // data = { access_token, scope, token_type }
      let token = localStorage.getItem('token')

      if (data) {
        localStorage.setItem('token', data.access_token)
        return { loggedIn: true, token: data.access_token }
      } else if (token) {
        return { loggedIn: true, token }
      } else {
        return { loggedIn: false }
      }
    },
  },
  profile: {
    url: '/user',
    transformer: transformers.object,
  },
  /**
    Create Project on Repository
    @see {@link https://developer.github.com/v3/projects/#create-a-repository-project}
  **/
  createProject: {
    url: '/repos/:owner/:repo/projects',
    virtual: true,
    options: {
      headers: {
        Accept: 'application/vnd.github.inertia-preview+json',
      },
      method: 'POST',
    },
    transformer: transformers.object,
  },
  listProjects: {
    url: '/repos/:owner/:repo/projects',
    virtual: true,
    options: {
      headers: {
        Accept: 'application/vnd.github.inertia-preview+json',
      },
    },
    transformer: transformers.array,
  },
  deleteProject: {
    url: '/projects/:id',
    virtual: true,
    options: {
      headers: {
        Accept: 'application/vnd.github.inertia-preview+json',
      },
      method: 'DELETE',
    },
    transformer: transformers.object,
  },
  createColumn: {
    url: '/projects/:project_id/columns',
    virtual: true,
    options: {
      headers: {
        Accept: 'application/vnd.github.inertia-preview+json',
      },
      method: 'POST',
    },
    transformer: transformers.object,
  },
  /**
    CRUD issues for Repository
    @see {@link https://developer.github.com/v3/issues/}
  **/
  createIssue: {
    url: '/repos/:owner/:repo/issues',
    virtual: true,
    options: {
      method: 'POST',
    },
  },
  listIssues: {
    url: '/repos/:owner/:repo/issues',
    virtual: true,
    transformer: transformers.array,
  },
  updateIssue: {
    url: '/repos/:owner/:repo/issues/:number',
    virtual: true,
    options: {
      method: 'PATCH',
    },
    transformer: transformers.object,
  },
  /**
    Create Label for Repository
    @see {@link https://developer.github.com/v3/issues/labels/#create-a-label}
  **/
  createLabel: {
    url: '/repos/:owner/:repo/labels',
    virtual: true,
    options: {
      method: 'POST',
    },
    transformer: transformers.object,
  },
}

const options = {
  prefix: 'github',
}

const rest = reduxApi(endpoints, options)
rest.use('fetch', adapterFetch(fetch))
rest.use('rootUrl', GITHUB.api)
rest.use('options', (url, params, getState) => {
  let token = getState().github.auth.data.token || localStorage.getItem('token')

  if (params && params.body) params.body = JSON.stringify(params.body)

  return {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...params,
  }
})

export const githubController = rest

export const github = githubController.actions
