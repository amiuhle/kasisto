import { func } from 'prop-types'
import React from 'react'

const Settings = (props) => {
  const {
    onSetHost,
    onSetPort,
    settings: {
      host,
      port
    }
  } = props

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <h3 className='u-margin-bottom-none'>
          <label htmlFor='host'>Host</label>
        </h3>
        <div className='u-margin-bottom o-flex o-flex--col'>
          <input
            id='host'
            value={host || ''}
            onChange={onSetHost}
            type='text'
            autoFocus
          />
        </div>

        <h3 className='u-margin-bottom-none'>
          <label htmlFor='port'>Port</label>
        </h3>
        <div className='u-margin-bottom o-flex o-flex--col'>
          <input
            id='port'
            value={port || ''}
            onChange={onSetPort}
            type='text'
            autoFocus
          />
        </div>

        <div className='u-margin-bottom o-flex o-flex--col'>
          <a className='c-btn' href={'#/'}>
            Save
          </a>
        </div>
      </div>
    </div>
  )
}

Settings.propTypes = {
  onSetHost: func.isRequired,
  onSetPort: func.isRequired
}

export default Settings
