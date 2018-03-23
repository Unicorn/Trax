import * as React from 'react'
import * as ReactDOM from 'react-dom'

// ROUTER
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from 'config/routes'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from 'controllers/reduxController'
const PersistGate = require('redux-persist/es/integration/react').PersistGate

import 'assets/styles/app.scss'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
