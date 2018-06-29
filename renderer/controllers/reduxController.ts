import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'controllers/sagaController'

import { alertsReducer } from 'controllers/alertController'
import { authReducer } from 'controllers/authController'
import { orgsReducer } from 'controllers/orgController'
import { profileReducer } from 'controllers/profileController'
import { reposReducer } from 'controllers/repoController'
import { settingsReducer } from 'controllers/settingController'
import { trackReducer } from 'controllers/trackController'

const saga = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  blacklist: ['alerts'],
  storage
}

const rootReducer = persistCombineReducers(persistConfig, {
  alerts: alertsReducer,
  auth: authReducer,
  orgs: orgsReducer,
  profile: profileReducer,
  repos: reposReducer,
  settings: settingsReducer,
  tracks: trackReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(saga))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)

saga.run(rootSaga)