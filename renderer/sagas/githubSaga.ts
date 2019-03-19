import { takeLatest, call } from 'redux-saga/effects'
import { GITHUB } from 'models/github'
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

// const Octokit = require('@octokit/rest')
// const octokit = new Octokit ()

function* watchOrgsRequest(action: { type: string }): Iterable<any> {
  yield console.log("watchOrgsRequest", action, octokit)

  let orgs = yield call(octokit.orgs.listForAuthenticatedUser)

  console.log("orgs for user", orgs)

}

export default function* githubSaga(): Iterable<any> {
  yield takeLatest(GITHUB.ORGS.REQUEST, watchOrgsRequest)
}
