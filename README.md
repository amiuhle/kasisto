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

* [ ] Make it pretty
* [ ] Make it progressive

TODOs
-----

### `src/lib/monero-payments`

will eventually become a separate node library.
