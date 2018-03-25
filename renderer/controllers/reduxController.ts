import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { githubController } from 'controllers/githubController'
import { timerReducer } from 'controllers/timerController'
import { trackReducer } from 'controllers/trackController'
import { alertReducer } from 'controllers/alertController'
import { modalReducer } from 'controllers/modalController'
import { issueReducer } from 'controllers/issueController'
import { invoiceReducer } from 'controllers/invoiceController'
import { Alert } from 'types/alert'
import { Invoice } from 'types/invoice'

export type RootState = {
  github: any;
  timer: any;
  tracks: any;
  form: any;
  alerts: Alert[];
  modals: any;
  issues: any;
  invoices: Invoice[];
}

const persistConfig = {
  blacklist: ['form', 'alerts', 'modals'],
  key: 'tracks',
  storage,
}

const rootReducer = persistCombineReducers(persistConfig, {
  github: combineReducers(githubController.reducers),
  timer: timerReducer,
  tracks: trackReducer,
  form: formReducer,
  alerts: alertReducer,
  modals: modalReducer,
  issues: issueReducer,
  invoices: invoiceReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)
