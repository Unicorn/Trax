import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'helpers/thunk'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { githubController } from 'controllers/githubController'
import { timerReducer } from 'controllers/timerController'
import { tracksReducer } from 'controllers/tracksController'
import { alertsReducer } from 'controllers/alertsController'
import { modalReducer } from 'controllers/modalController'
import { issuesReducer } from 'controllers/issuesController'
import { invoicesReducer } from 'controllers/invoicesController'

const persistConfig = {
  blacklist: ['form', 'alerts', 'modals'],
  key: 'tracks',
  storage,
}

const rootReducer = persistCombineReducers(persistConfig, {
  github: combineReducers(githubController.reducers),
  timer: timerReducer,
  tracks: tracksReducer,
  form: formReducer,
  alerts: alertsReducer,
  modals: modalReducer,
  issues: issuesReducer,
  invoices: invoicesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)
