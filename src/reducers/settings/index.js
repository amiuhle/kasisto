import {
  SAVE_SETTINGS
} from '../../actions/constants/settings'

export const getSettings = (state) => Object.assign({}, state)

export const defaultSettings = {
  fiatCurrency: 'EUR'
}

const settings = (state = defaultSettings, action) => {
  const { type, payload } = action
  switch (type) {
    case SAVE_SETTINGS: {
      return Object.assign({}, state, payload)
    }
    default: {
      return state
    }
  }
}

export default settings
