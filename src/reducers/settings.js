import {
  SET_HOST,
  SET_PORT
} from '../actions/constants/settings'

// TODO This needs to be a more database-like structure
const payments = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_HOST: {
      return Object.assign({}, state, { host: payload })
    }
    case SET_PORT: {
      return Object.assign({}, state, { port: payload })
    }
    default: {
      return state
    }
  }
}

export default payments

export const getHost = ({ host }) => host
export const getPort = ({ port }) => port
