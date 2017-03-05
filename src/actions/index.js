/* eslint-disable import/newline-after-import */
/* Exports all the actions from a single point.

Allows to import actions like so:

import {action1, action2} from '../actions/'
*/
/* Populated by react-webpack-redux:action */
import setTip from '../actions/setTip.js'
import setAmount from '../actions/setAmount.js'
import setReceipt from '../actions/setReceipt.js'
const actions = {
  setReceipt,
  setAmount,
  setTip
}
module.exports = actions
