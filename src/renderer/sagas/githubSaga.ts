import { SagaIterator } from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects'
import { createAlert, call, normalizePayload } from 'horseshoes'
import { updateOrgs, updateOrgRepos } from '@/controllers/orgController'
import { updateRepos } from '@/controllers/repoController'
import { GITHUB, octokit, GetReposForLogin } from '@/models/github'
import { Org } from '@/models/org'
import { Repo } from '@/models/repo'

function* watchOrgsRequest(): SagaIterator {
  try {
    const orgs = yield* call(octokit.orgs.listForAuthenticatedUser)

    if (!orgs.data) throw new Error('Could not fetch org data')

    yield put(updateOrgs(normalizePayload(orgs.data) as Org[]))
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

function* watchReposRequest(action: GetReposForLogin): SagaIterator {
  const { login, key } = action
  let repos

  try {
    if (login === 'personal') repos = yield* call(octokit.repos.list, { per_page: 100 })
    else repos = yield* call(octokit.repos.listForOrg, { org: login, per_page: 100 })

    if (!repos) return

    repos = normalizePayload(repos.data) as Repo[]

    yield put(updateOrgRepos({ key: key || login, data: repos }))
    yield put(updateRepos(repos))
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

export default function* githubSaga(): SagaIterator {
  yield takeLatest(GITHUB.ORGS.REQUEST, watchOrgsRequest)
  yield takeLatest(GITHUB.REPOS.REQUEST, watchReposRequest)
}
