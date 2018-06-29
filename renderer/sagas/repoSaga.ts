import { put, call, takeEvery } from 'redux-saga/effects'
import { fetchRepos } from 'services/githubService'
import { receiveRepos } from 'controllers/repoController'
import { REPO, ReposAction } from 'models/repo'

function* watchReposRequest(action: ReposAction) {
  const { login } = action

  console.log(login)

  const repos = yield call(fetchRepos, login)

  console.log('watchReposRequest', repos)

  yield put(receiveRepos(repos))
}


export default function* repoSaga() {
  yield takeEvery(REPO.REQUEST, watchReposRequest)
}
