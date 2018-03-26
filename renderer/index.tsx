import * as React from 'react'
import * as ReactDOM from 'react-dom'

// ROUTER
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from 'config/routes'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from 'controllers/reduxController'
const PersistGate = require('redux-persist/es/integration/react').PersistGate

import 'assets/styles/app.scss'

require('dotenv').config()

declare global {
  interface Window {
    require: any;
    process: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
