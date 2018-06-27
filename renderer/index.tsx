import { BrowserWindow } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'

// ROUTER
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from 'config/routes'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from 'controllers/reduxController'
import { PersistGate } from 'redux-persist/integration/react'

import 'assets/styles/app.scss'

declare global {
  interface Window {
    app: any
    BrowserWindow: any
    dialog: any
    eval: any
    ipc: any
    shell: any
    authWindow: BrowserWindow
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
