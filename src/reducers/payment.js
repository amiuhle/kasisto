/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {SET_AMOUNT, SET_RECEIPT, SET_TIP} from '../actions/const'

const initialState = {
  amount: 0.89,
  receipt: `${new Date().toISOString().slice(0, 10)} / 001`,
  tip: 0
}

function reducer (state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state)

  switch (action.type) {
    case SET_AMOUNT: {
      nextState.amount = action.parameter
      return nextState
    }
    case SET_RECEIPT: {
      nextState.receipt = action.parameter
      return nextState
    }
    case SET_TIP: {
      nextState.tip = action.parameter
      return nextState
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}

module.exports = reducer
