import { SET_AMOUNT } from './const'

function action (e) {
  return { type: SET_AMOUNT, parameter: parseFloat(e.target.value) }
}

module.exports = action
