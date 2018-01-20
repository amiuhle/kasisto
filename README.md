# Kasisto

[![Join the chat at https://gitter.im/amiuhle/kasisto](https://badges.gitter.im/amiuhle/kasisto.svg)](https://gitter.im/amiuhle/kasisto?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/amiuhle/kasisto.svg?branch=master)](https://travis-ci.org/amiuhle/kasisto)

Kasisto is a Point of Sale payment system to accept the cryptocurrency [Monero](https://getmonero.org/). The only requirement is an internet connection, there are no third parties involved.

To be fast (confirmation within seconds), Kasisto accepts unconfirmed transactions.

## Try it

If no wallet is configured in the settings, Kasisto will default to a testnet wallet so it can be easily tested. Download [Monerujo](https://monerujo.io/) and create a testnet wallet. Note that you have to be on the old v6 testnet network, before the v7 (bulletproof) hardfork. You can use `testnet.kasisto.io` as a remote node.

## Getting Started

Kasisto consists of an app running on a mobile phone or tablet and a server to which the app connects to listen for incoming payments.

### The mobile app

Kasisto is implemented as a [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app). It's targeted to run on any modern mobile browser, including Chrome for Android, Firefox, Safari iOS and Edge. It can be added to the home screen and will run without showing the browser's address bar if done so.

All payment details and configuration settings are stored locally in the app, the server is accessed in a read-only way to listen for incoming transactions.


### The server

The server is responsible for communicating with the Monero network and can be located in your local network or anywhere on the internet. It needs to run the Monero daemon, a view-only wallet and a web proxy for handling HTTPS.

For detailed setup instructions, see [the server setup docs](docs/server-setup.md).

**On your local computer**, create a dedicated wallet for Kasisto first, then [create a view-only wallet](https://getmonero.org/knowledge-base/user-guides/view_only) for it. Upload / copy the view-only wallet file to the server.

#### Configuration

TL;DR: `monerod`, `monero-wallet-rpc` and `nginx` acting as a reverse proxy to provide SSL support and send CORS headers.

```bash
# Download latest Monero release
curl https://downloads.getmonero.org/cli/monero-linux-x64-v0.10.2.1.tar.bz2 > /tmp/monero.tar.bz2
# Validate file
echo "9edba6ca91c35c6c2eb6816f9342931c88648de5beb471943ea63d0b16c9a2e4 /tmp/monero.tar.bz2" | sha256sum -c
# Extract binanries
tar -xf /tmp/monero.tar.bz2 -C /tmp && mv /tmp/monero-v0.10.2.1/* /usr/local/bin/
```

Start services and configure proxy. It's derived from my current testnet setup, there will be startup scripts and stuff as this evolves.

```bash
# Run a full node in daemon mode. If it's the first time you started it, it will take a while to synchronize
monerod --testnet --detach

# There's no --detach for this, so I usually run this in a screen session or separate terminal
# In production, you should remove --disable-rpc-login and configure username / password
monero-wallet-rpc --testnet --rpc-bind-port 28083 --disable-rpc-login --wallet-file /path/to/view-only-wallet
```

Next, configure `nginx` as a reverse proxy handling connections to the Kasisto app:

```nginx
# TODO: SSL
server {
  listen [::]:28082;
  listen 28082;

  server_name to-the-moon;
  charset UTF-8;

  # Proxy monero-wallet-rpc calls
  location /json_rpc {
    proxy_http_version 1.1;
    proxy_pass http://127.0.0.1:28083/json_rpc;

    add_header Access-Control-Allow-Origin *; # Can be restricted later
    add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
    add_header Access-Control-Allow-Headers "Origin, Authorization, Accept, Content-Type";
    add_header Access-Control-Allow-Credentials true;
  }
}
```

## Development

Clone, install dependencies and run `yarn` to install dependencies. (`npm install` should work just fine).

To start a local server, run `yarn start`.


## Contribute

If you want to contribute to Kasisto, you can do so in any of the following ways, in no particular order:

* Test Kasisto by using it in your cafe, bar or shop. If you have any problems setting things up, open an issue and I'll help!
* Submit any other issue or a pull request
* Look at the existing [Issues](https://github.com/amiuhle/kasisto/issues). Not everything is about development, the labels `help-wanted` and especially `research` are mainly configuration / maintenance stuff and actual real-world research.

You can also support the project by donating to the following address:

<!-- Maybe GitHub will support Monero at some time by displaying a barcode for this :) -->

```monero
4JkULN8gD1M1hjSJBMgnC8FTKhVgMeYg6dzbqnhmSiERc3M4TUrJZ4nDMet1vCkh98C8nJWFmEMiAaaDRwWehqAJFrzAq1WNEP4SXgbVNX
```
