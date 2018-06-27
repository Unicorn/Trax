import { BrowserWindow } from 'electron'

import * as React from 'react'
import { render } from 'react-dom'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from 'controllers/reduxController'
import { PersistGate } from 'redux-persist/integration/react'

import Page from 'views/layouts/Page'

import 'assets/styles/app.scss'

declare global {
  interface Window {
    app: any
    BrowserWindow: any
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
      <Page />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
