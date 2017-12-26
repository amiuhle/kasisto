import * as types from './constants/settings'

export const saveSettings = (settings) => ({
  type: types.SAVE_SETTINGS,
  payload: settings
})
