import createHistory from 'history/createBrowserHistory'
import logger from 'redux-logger'
import { applyMiddleware, compose, createStore } from 'redux'

import reducers from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

export default (initialState) => {
  const middlewares = []

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers')  // eslint-disable-line global-require

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
