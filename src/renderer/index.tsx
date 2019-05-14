import * as React from 'react'
import { render } from 'react-dom'

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
    eval: any
    ipc: any
    shell: any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

const App: React.SFC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Page />
    </PersistGate>
  </Provider>
)

render(<App />, document.getElementById('app'))
