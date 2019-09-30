/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { render } from 'react-dom'

// REDUX
import { Provider } from 'react-redux'
import { store, persistor } from '@/controllers/reduxController'
import { PersistGate } from 'redux-persist/integration/react'

import Page from '@/views/layouts/Page'

import '@/assets/styles/app.scss'

const App: SFC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Page />
    </PersistGate>
  </Provider>
)

render(<App />, document.getElementById('app'))
