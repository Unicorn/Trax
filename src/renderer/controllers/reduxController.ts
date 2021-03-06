import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '@/controllers/sagaController'

import { alertReducer } from 'horseshoes'
import { githubReducer } from '@/controllers/githubController'
import { googleReducer } from './googleController'
import { issuesReducer } from '@/controllers/issueController'
import { invoiceReducer } from '@/controllers/invoiceController'
import { orgsReducer } from '@/controllers/orgController'
import { profileReducer } from '@/controllers/profileController'
import { reposReducer } from '@/controllers/repoController'
import { settingsReducer } from '@/controllers/settingController'
import { lanesReducer } from '@/controllers/laneController'
import { timerReducer } from '@/controllers/timerController'
import { trackReducer } from '@/controllers/trackController'
import { usersReducer } from '@/controllers/userController'

declare global {
  interface Window {
    app: {
      version: string
    }
    shell: Electron.Shell
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  }
}

const saga = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  blacklist: [],
  storage
}

const rootReducer = persistCombineReducers(persistConfig, {
  alerts: alertReducer,
  github: githubReducer,
  google: googleReducer,
  issues: issuesReducer,
  invoices: invoiceReducer,
  orgs: orgsReducer,
  profile: profileReducer,
  repos: reposReducer,
  lanes: lanesReducer,
  settings: settingsReducer,
  timers: timerReducer,
  tracks: trackReducer,
  users: usersReducer
} as any)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(saga))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)

saga.run(rootSaga)
