import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'controllers/sagaController'

import { alertsReducer } from 'controllers/alertController'
import { settingsReducer } from 'controllers/settingController'
import { userReducer } from 'controllers/userController'

const saga = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  blacklist: ['alerts'],
  storage
}

const rootReducer = persistCombineReducers(persistConfig, {
  alerts: alertsReducer,
  settings: settingsReducer,
  user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(saga))

export const store = createStore(rootReducer, enhancer)
export const persistor = persistStore(store)

saga.run(rootSaga)
