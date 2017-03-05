/* global describe, it */
var reducer = require('../../src/reducers/payment')

describe('payment', () => {
  it('should not change the passed state', (done) => {
    const state = Object.freeze({})
    reducer(state, {type: 'INVALID'})

    done()
  })
})
