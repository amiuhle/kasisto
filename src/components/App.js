import React from 'react'

export default ({ children }) => (
  <div className='o-app'>
    <div className='o-app__header'>
      <h1 className='u-margin-none u-margin-left o-flex__stretch'>Kasisto</h1>
      <small className='u-muted'>Testnet</small>
    </div>
    <aside className='o-app__nav' />
    <section className='o-app__content'>
      { children }
    </section>
    <footer className='o-app__footer' />
  </div>
)
