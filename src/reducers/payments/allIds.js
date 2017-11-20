import {
  CREATE_PAYMENT
} from '../../actions/constants/payments'

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case CREATE_PAYMENT:
      return [payload.id, ...state]
    default:
      return state
  }
}

export default allIds

export const getIds = (state) => state
