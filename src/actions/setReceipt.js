import { SET_RECEIPT } from './const'

function action (e) {
  return { type: SET_RECEIPT, parameter: e.target.value }
}

module.exports = action
