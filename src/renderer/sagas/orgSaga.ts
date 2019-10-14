import { SagaIterator } from 'redux-saga'
import { takeLatest, put } from 'redux-saga/effects'
import { createAlert, call, normalizePayload } from 'horseshoes'
import { updateOrgs } from '@/controllers/orgController'
import { GITHUB, octokit } from '@/models/github'
import { Org } from '@/models/org'

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

export default function* orgSaga(): SagaIterator {
  yield takeLatest(GITHUB.ORGS.REQUEST, watchOrgsRequest)
}
