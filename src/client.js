import './styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import { loadState, saveState } from './lib/persistence'

import configureStore from './stores'

import App from './routes'

const persistedState = loadState()
const store = configureStore(persistedState)
store.subscribe(() => {
  saveState(store.getState())
})

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.querySelector('main')
)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default // eslint-disable-line global-require

    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.querySelector('main')
    )
  })
}
