import React, { Fragment } from 'react'

import { reduxForm, Field } from 'redux-form'

import Icon from '../components/Icon'

const CMC_CURRENCIES = [
  'AUD',
  'BRL',
  'CAD',
  'CHF',
  'CLP',
  'CNY',
  'CZK',
  'DKK',
  'EUR',
  'GBP',
  'HKD',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PKR',
  'PLN',
  'RUB',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'TWD',
  'USD',
  'ZAR'
]

const Settings = ({ handleSubmit }) => {
  return (
    <Fragment>
      <div className='o-app__content c-settings'>
        <form id='settings-form' onSubmit={handleSubmit}>
          <div className='form-field'>
            <label htmlFor='name'>Name</label>
            <Field name='name' component='input' placeholder='Coffee shop' />
          </div>

          <div className='form-field'>
            <label htmlFor='fiatCurrency'>Currency</label>
            <Field name='fiatCurrency' component='select'>
              {CMC_CURRENCIES.map((currency) => <option key={currency}>{currency}</option>)}
            </Field>
          </div>

          <div className='form-field'>
            <label htmlFor='walletUrl'>Wallet URL</label>
            <Field name='walletUrl' component='input' placeholder='https://testnet.kasisto.io:28084/json_rpc' />
          </div>

          <div className='form-field'>
            <label htmlFor='pollingInterval'>Polling interval (ms)</label>
            <Field name='pollingInterval' component='input' type='number' placeholder='2000' />
          </div>

          <div className='form-field'>
            <label htmlFor='username'>Username</label>
            <Field name='username' component='input' />
          </div>

          <div className='form-field'>
            <label htmlFor='password'>Password</label>
            <Field name='password' component='input' type='password' />
          </div>
        </form>
      </div>

      <div className='o-app__top-left'>
        <Icon href='/' name='back' />
      </div>

      <button form='settings-form' className='o-app__footer c-btn'>
        Save
      </button>
    </Fragment>
  )
}

const createForm = reduxForm({
  form: 'settings'
})

export default createForm(Settings)
