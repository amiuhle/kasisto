import React, { Fragment } from 'react'

import { reduxForm, Field } from 'redux-form'

import Icon from '../components/Icon'

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
            <label htmlFor='currency'>Currency</label>
            <Field name='currency' component='select'>
              <option>EUR</option>
            </Field>
          </div>

          <div className='form-field'>
            <label htmlFor='walletUrl'>Wallet URL</label>
            <Field name='walletUrl' component='input' placeholder='https://testnet.kasisto.io:28084/json_rpc' />
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
