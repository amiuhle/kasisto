import * as types from './constants/settings'

export const setHost = (host) => ({
  type: types.SET_HOST,
  payload: host
})

export const setPort = (port) => ({
  type: types.SET_PORT,
  payload: port
})
