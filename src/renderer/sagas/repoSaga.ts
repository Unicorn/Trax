import { SagaIterator } from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects'
import { createAlert, call, normalizePayload } from 'horseshoes'
import { updateOrgRepos } from '@/controllers/orgController'
import { updateRepos } from '@/controllers/repoController'
import { GITHUB, octokit, GetReposForLogin } from '@/models/github'
import { Repo } from '@/models/repo'

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

export default function* repoSaga(): SagaIterator {
  yield takeLatest(GITHUB.REPOS.REQUEST, watchReposRequest)
}
