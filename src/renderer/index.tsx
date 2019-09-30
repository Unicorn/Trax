/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { render } from 'react-dom'
import { compose } from 'redux'
import { IpcRenderer, Shell } from 'electron'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from '@/controllers/reduxController'
import { PersistGate } from 'redux-persist/integration/react'

import Page from '@/views/layouts/Page'

import '@/assets/styles/app.scss'

declare global {
  interface Window {
    app: {
      version: string
    }
    ipc: IpcRenderer
    shell: Shell
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  }
}

const App: SFC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Page />
    </PersistGate>
  </Provider>
)

render(<App />, document.getElementById('app'))
