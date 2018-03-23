import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistCombineReducers } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import localForage from 'localforage'
import { githubController } from 'controllers/githubController'
import { timerReducer } from 'controllers/timerController'
import { trackReducer } from 'controllers/trackController'
import { alertReducer } from 'controllers/alertController'
import { modalReducer } from 'controllers/modalController'
import { issueReducer } from 'controllers/issueController'

const persistConfig = {
  key: 'tracks',
  storage: localForage,
  stateReconciler: hardSet,
  blacklist: ['form', 'alerts', 'modals'],
}

const rootReducer = persistCombineReducers(persistConfig, {
  github: combineReducers(githubController.reducers),
  timer: timerReducer,
  tracks: trackReducer,
  form: formReducer,
  alerts: alertReducer,
  modals: modalReducer,
  issues: issueReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)
