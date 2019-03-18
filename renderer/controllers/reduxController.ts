import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'controllers/sagaController'

import { alertsReducer } from 'controllers/alertController'
import { authReducer } from 'controllers/authController'
import { issuesReducer } from 'controllers/issueController'
import { invoiceReducer } from 'controllers/invoiceController'
import { orgsReducer } from 'controllers/orgController'
import { profileReducer } from 'controllers/profileController'
import { reposReducer } from 'controllers/repoController'
import { settingsReducer } from 'controllers/settingController'
import { timerReducer } from 'controllers/timerController'
import { trackReducer } from 'controllers/trackController'

const saga = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  blacklist: [],
  storage
}

const rootReducer = persistCombineReducers<any>(persistConfig, {
  alerts: alertsReducer,
  auth: authReducer,
  issues: issuesReducer,
  invoices: invoiceReducer,
  orgs: orgsReducer,
  profile: profileReducer,
  repos: reposReducer,
  settings: settingsReducer,
  timers: timerReducer,
  tracks: trackReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(saga))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)

saga.run(rootSaga)
