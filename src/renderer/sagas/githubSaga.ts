import { createAlert } from 'horseshoes'
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects'
import { GITHUB, octokit, GetReposForLogin } from '@/models/github'
import { updateOrgs, updateOrgRepos } from '@/controllers/orgController'
import { updateRepos } from '@/controllers/repoController'
import { normalizePayload } from '@/models/app'

function* watchOrgsRequest(): Iterable<CallEffect | PutEffect> {
  try {
    let orgs = yield call(octokit.orgs.listForAuthenticatedUser)

    if (!orgs.data) throw new Error('Could not fetch org data')

    yield put(updateOrgs(normalizePayload(orgs.data)))
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchOrgsRequestError',
        status: 'error',
        message: `Error fetching user orgs: ${e.message}`,
        dismissable: true
      })
    )
  }
}

function* watchReposRequest(action: GetReposForLogin): Iterable<CallEffect | PutEffect> {
  const { login, key } = action
  let repos

  try {
    if (login === 'personal') repos = yield call(octokit.repos.list, { per_page: 100 })
    else repos = yield call(octokit.repos.listForOrg, { org: login, per_page: 100 })

    yield put(updateOrgRepos({ key: key || login, data: normalizePayload(repos.data) }))
    yield put(updateRepos(normalizePayload(repos.data)))
  } catch (e) {
    yield put(
      createAlert({
        key: 'watchReposRequestError',
        status: 'error',
        message: `Error fetching ${login} repos: ${e.message}`,
        dismissable: true
      })
    )
  }
}

export default function* githubSaga(): Iterable<ForkEffect> {
  yield takeLatest(GITHUB.ORGS.REQUEST, watchOrgsRequest)
  yield takeLatest(GITHUB.REPOS.REQUEST, watchReposRequest)
}
