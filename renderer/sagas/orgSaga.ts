import { put, call, takeEvery } from 'redux-saga/effects'
import { fetchOrgs } from 'services/githubService'
import { receiveOrgs } from 'controllers/orgController'
import { ORG, OrgsAction } from 'models/org'

function* watchOrgsRequest(_action: OrgsAction) {
  const org = yield call(fetchOrgs, 'user')

  console.log('watchOrgsRequest', org)

  yield put(receiveOrgs(org))
}


export default function* orgSaga() {
  yield takeEvery(ORG.REQUEST, watchOrgsRequest)
}
