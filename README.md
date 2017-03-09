Kasisto
=======

[![Join the chat at https://gitter.im/amiuhle/kasisto](https://badges.gitter.im/amiuhle/kasisto.svg)](https://gitter.im/amiuhle/kasisto?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Introduction
------------

Kasisto is a Point of Sale software to receive payments in [Monero](https://getmonero.org/). Example use cases include bars, cafes, restaurants and shops... Any place with an internet connection basically.

To be fast (confirmation within seconds), Kasisto will accept unconfirmed transactions. Combined with the current transaction fees of around $0.25, the targeted payment amounts should be between $10 and $100. I don't know how likely it is that a transaction will not get mined, so every seller will have to find their own pain barrier. Similarly, buyers will have to find their own personal lower limit in regards to current transaction fees.

Prices will be shown in XMR and any fiat currencies supported by some exchange rate APIs, but there will be no automatic XMR to fiat conversion. Who would sell XMR, right? This is for the keepers and crypto enthusiasts: you will need to have a little server with `monerod` and `monero-wallet-rpc` (accessing a view-only wallet) running.

In return, you will get a completely independent payment system, without any external payment provider involved. It's Monero being used as cash! And you'll also help the network by running a full node, of course!

### Current Status

Here's a [Testnet Demo](https://amiuhle.github.io/kasisto), it's polling the wallet every 10 seconds. In production, it should be possible to lower this to one second, making payments pretty much instant. The split view design is something I played around with, but that will probably not make it into the initial release.

Technical Details
-----------------

### The mobile app

Kasisto is a [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_app). It runs run on any modern browser, but only browsers [supporting ServiceWorker](https://jakearchibald.github.io/isserviceworkerready/) will have offline usage. It's implemented as a web app because this gets rid of the necessity to develop individual apps for Android, iOS and smaller platforms. Plus, the web comes with a free auto-update functionality, and there's no requirement in Kasisto that can't be met with a decent browser today. Safari is kind of the new Internet Explorer when it comes to things like this though, so there will be missing features in iOS (offline support) for now, but the app itself ~~will~~ should still work ([#7](https://github.com/amiuhle/kasisto/issues/7)).

All configuration and transaction details will be stored in the browser ([even in iOS 10+](http://caniuse.com/#feat=indexeddb), with polyfills possibly lower), and there will be no cookies on the site that is serving Kasisto. The web really is just a way to distribute and update an application in this case.

Configuration will include:

* The only mandatory requirement for Kasisto to work: Connection details to `monero-wallet-rpc` accessing a **view-only** wallet
  * `url` - http(s) URL to wallet RPC service
  * `username` - *(optional)* Configurable credentials in `monero-wallet-rpc`
  * `password` - *(optional)* Configurable credentials in `monero-wallet-rpc`
* Connection details for fiat exchange rate API (Poloniex, Cryptonator). Can be left blank if no fiat exchange rates are needed.

### The local server

In addition to the mobile device(s) running the web app, you will need to run a local server. Hardware requirements for dedicated devices will have to be figured out. If you already have a PC running, I will provide instructions how to configure on Ubuntu below, and there will probably be Docker images and sample configurations.

**On your local computer**, create a dedicated wallet for Kasisto first, then [create a view-only wallet](https://github.com/amiuhle/monero-site/blob/eb816710e42229b5c7e6504f48f6dc5ad2fa583a/knowledge-base/user-guides/view_only.md) for it. Upload / copy the view-only wallet file to the server.

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

Restart nginx `sudo service nginxn restart`.

### TODO

* Local SSL options
  * Import self-signed certificate on mobile device
  * If you have a domain, use [Let's Encrypt](https://letsencrypt.org/) for subdomain and override DNS for local network

Development
-----------

Clone, install dependencies and run (`npm` should work just fine).

For now, you have to edit `monero-wallet-rpc` connection settings in `src/components/App.js`. This will move to browser storage pretty fast.

```
git clone https://github.com/amiuhle/kasisto.git
yarn
yarn start
```

TODO
----

### [Research Topics](https://github.com/amiuhle/kasisto/issues?q=is%3Aissue+is%3Aopen+label%3Aresearch)

### `src/lib/monero-payments`

will eventually become a separate node library to easily receive Monero. Any suggestions for a top level API would be welcome, please submit an issue.

Contribute
----------

If you want to contribute to Kasisto, you can do so in any of the following ways, in no particular order:

* Test Kasisto by accepting in your cafe, bar or shop. If you have any problems setting things up, open an issue and I'll help!
* Submit any other issue or a pull request
* Look at the existing [Issues](https://github.com/amiuhle/kasisto/issues). Not everything is about development, the labels `help-wanted` and especially `research` are mainly configuration / maintenance stuff and actual real-world research.

You can also support the project by donating to the following address:

```
4JkULN8gD1M1hjSJBMgnC8FTKhVgMeYg6dzbqnhmSiERc3M4TUrJZ4nDMet1vCkh98C8nJWFmEMiAaaDRwWehqAJFrzAq1WNEP4SXgbVNX
```
