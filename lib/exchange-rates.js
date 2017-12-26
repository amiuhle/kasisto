const { fetch } = window

export const fetchExchangeRate = (fiatCurrency) => {
  if (fiatCurrency === null) {
    return Promise.resolve(1)
  } else {
    // return fetch('https://api.kraken.com/0/public/Ticker?pair=xmreur,xmrusd')
    //   .then(response => response.json())
    //   .then(json => Number.parseFloat(json.result[`XXMRZ${fiatCurrency}`]['p'][1]))
    return fetch(`https://api.coinmarketcap.com/v1/ticker/monero/?convert=${fiatCurrency}`)
      .then(response => response.json())
      .then(json => Number.parseFloat(json[0][`price_${fiatCurrency.toLowerCase()}`]))
  }
}
