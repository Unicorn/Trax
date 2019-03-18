import { put, call, takeLatest } from 'redux-saga/effects'
import { fetchOrgs } from 'services/githubService'
import { receiveOrgs } from 'controllers/orgController'
import { ORG, OrgsAction } from 'models/org'

function* watchOrgsRequest(_action: OrgsAction) {
  const org = yield call(fetchOrgs)
  yield put(receiveOrgs(org))
}

export default function* orgSaga() {
  yield takeLatest(ORG.REQUEST, watchOrgsRequest)
}
