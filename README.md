# Kasisto

[![Join the chat at https://gitter.im/amiuhle/kasisto](https://badges.gitter.im/amiuhle/kasisto.svg)](https://gitter.im/amiuhle/kasisto?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/amiuhle/kasisto.svg?branch=master)](https://travis-ci.org/amiuhle/kasisto)

Kasisto is a Point of Sale payment system to accept the cryptocurrency [Monero](https://getmonero.org/). The only requirement is an internet connection, there are no third parties involved.

To be fast (confirmation within seconds), Kasisto accepts unconfirmed transactions.

[Kasisto in 22 seconds](https://gfycat.com/gifs/detail/littlecompleteallosaurus)

## Try it

If no wallet is configured in the settings, Kasisto will default to a testnet wallet so it can be easily tested. Download [Monerujo](https://monerujo.io/) and create a testnet wallet. Note that you have to be on the old v6 testnet network, before the v7 hardfork. You can use `testnet.kasisto.io` as a remote node.

## Getting Started

Kasisto consists of an app running on a mobile phone or tablet and a server to which the app connects to listen for incoming payments.

### The mobile app

Kasisto is implemented as a [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app). It's targeted to run on any modern mobile browser, including Chrome for Android, Firefox, Safari iOS and Edge. It can be added to the home screen and will run without showing the browser's address bar if done so.

All payment details and configuration settings are stored locally in the app, the server is accessed in a read-only way to listen for incoming transactions.


### The server

The server is responsible for communicating with the Monero network and can be located in your local network or anywhere on the internet. It needs to run the Monero daemon, a view-only wallet and a web proxy for handling HTTPS.

For detailed setup instructions, see [the server setup docs](docs/server-setup.md).

## Development

Clone, install dependencies and run `yarn` to install dependencies. (`npm install` should work just fine).

To start a local server, run `yarn start`.


## Contribute

If you want to contribute to Kasisto, you can do so in any of the following ways, in no particular order:

* Test Kasisto by using it in your cafe, bar or shop. If you have any problems setting things up, open an issue and I'll help!
* Submit any other issue or a pull request
* Look at the existing [Issues](https://github.com/amiuhle/kasisto/issues). Not everything is about development, the labels `help-wanted` and `research` are mainly configuration / maintenance stuff and actual real-world research.

You can also support the project by donating to the following address:

```monero
4JkULN8gD1M1hjSJBMgnC8FTKhVgMeYg6dzbqnhmSiERc3M4TUrJZ4nDMet1vCkh98C8nJWFmEMiAaaDRwWehqAJFrzAq1WNEP4SXgbVNX
```
