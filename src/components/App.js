import React, { Component } from 'react'

export default class App extends Component {
  state = {
    receipt: '',
    amount: 0
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id = target.id

    this.setState({
      [id]: value
    })
  }

  handleSubmit = (e) => {
    const { amount, receipt } = this.state
    const { createPayment } = this.props.actions
    createPayment(amount, receipt)
    e.preventDefault()
  }

  render () {
    const { amount, receipt } = this.state
    return (
      <div className='o-app'>
        <h1 className='o-app__header u-margin-none'>Kasisto</h1>
        <aside className='o-app__nav' />
        <section className='o-app__content'>
          <h2>Create Payment</h2>
          <form className='o-form' onSubmit={this.handleSubmit}>
            <label htmlFor='receipt'>Receipt</label>
            <input id='receipt' value={receipt} onChange={this.handleInputChange} type='text' className='u-align-right' autoFocus />
            <label htmlFor='amount'>Amount due</label>
            <input id='amount' value={amount} onChange={this.handleInputChange} type='number' className='u-align-right' />
            <button className='o-form-item--span'>Request payment</button>
          </form>
        </section>
        <footer className='o-app__footer' />
      </div>
    )
  }
}
