import React from 'react'

export default ({ children }) => (
  <div className='o-app'>
    <div className='o-app__header' />
    <aside className='o-app__nav' />
    <section className='o-app__content'>
      { children }
    </section>
    <footer className='o-app__footer' />
  </div>
)
