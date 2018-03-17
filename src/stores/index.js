import createHistory from 'history/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import rootSaga from '../sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

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

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers') // eslint-disable-line global-require

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
