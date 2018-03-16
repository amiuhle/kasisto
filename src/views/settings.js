import React, {
  Component,
  Fragment
} from 'react'

import { reduxForm, Field } from 'redux-form'

import Icon from '../components/Icon'

const { FileReader } = window

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

class Settings extends Component {
  state = {
    logoPreview: null
  }

  readImage = (e) => {
    e.preventDefault()
    const { change } = this.props
    const reader = new FileReader()
    const [ file ] = e.target.files

    reader.addEventListener('load', () => {
      change('logo', reader.result)
      this.setState({
        logoPreview: reader.result
      })
    })
    reader.readAsDataURL(file)
  }

  render () {
    const { handleSubmit, initialValues } = this.props

    return (
      <Fragment>
        <div className='o-app__content c-settings'>
          <form id='settings-form' onSubmit={handleSubmit}>
            <div className='form-field u-margin-top-small o-flex o-flex--ai-center'>
              <input id='logo' name='logo' type='file' accept='image/*'
                style={{opacity: 0, height: 0}}
                onChange={this.readImage}
              />
              <label htmlFor='logo' className='u-brand-primary u-medium u-base-size o-flex o-flex--col o-flex--ai-center'>
                <img className='c-owner-logo u-margin-bottom-small'
                  src={this.state.logoPreview || initialValues.logo}
                />
                Edit photo
              </label>
            </div>

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
        <div className='o-app__header'>Settings</div>

        <button form='settings-form' className='o-app__footer c-btn'>
          Save
        </button>
      </Fragment>
    )
  }
}

const createForm = reduxForm({
  form: 'settings'
})

export default createForm(Settings)
