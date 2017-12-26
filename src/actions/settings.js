import * as types from './constants/settings'

export const saveSettings = (settings) => ({
  type: types.SAVE_SETTINGS,
  payload: settings
})

export const fetchExchangeRate = (fiatCurrency) => ({
  type: types.FETCH_EXCHANGE_RATE,
  payload: fiatCurrency
})
