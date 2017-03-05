import { SET_TIP } from './const'

function action (e) {
  return { type: SET_TIP, parameter: typeof e === 'number' ? e : parseFloat(e.target.value) }
}

module.exports = action
