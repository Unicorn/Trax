import { takeEvery } from 'redux-saga/effects'

function* watchPersist(action: any) {
  const { payload } = action

  yield console.log('Persist:', payload)
}

export default function* persistSaga() {
  yield takeEvery('persist/REHYDRATE', watchPersist)
}
