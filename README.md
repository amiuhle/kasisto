Kasisto
=======

Get paid in XMR

What It Will Be
---------------

Kasisto will be a (completely static) Progressive Web App to receive [Monero](https://getmonero.org/home) (XMR) cash transactions. It will run on any modern browser, but only [browsers supporting ServiceWorker](https://jakearchibald.github.io/isserviceworkerready/) will have offline usage. The only connection required is to a `monero-wallet-rpc` accessing a view-only wallet running behind an HTTPS reverse proxy. Connection details will be configurable and stored locally in [IndexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API).

What It Is Now
--------------

A Proof Of Concept of the above. Receiving unconfirmed payments on testnet with 10 second polling interval: [Testnet Demo](https://amiuhle.github.io/kasisto)

Roadmap
-------

* [ ] Make it pretty - If you'd like to make a design proposal, please submit an issue!
* [ ] Make it progressive

Questions
---------

If you can help with any of these, please submit an issue, or comment if there already is one.

* What's required for proper taxation? Reference to receipt # enough? Would a barcode scanner help?

Development
-----------

Clone, install dependencies and run.

```
git clone https://github.com/amiuhle/kasisto.git
yarn
yarn start
```

TODOs
-----

### `src/lib/monero-payments`

will eventually become a separate node library to easily receive Monero. Any suggestions for a top level API would be welcome, please submit an issue.
