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
                  src={this.state.logoPreview || initialValues.logo || defaultLogo}
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
              <Field name='walletUrl' component='input' placeholder='https://stagenet.kasisto.io:28084/json_rpc' />
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

export const defaultLogo = 'data:image/png;base64,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'
