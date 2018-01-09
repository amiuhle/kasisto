# Server setup

Based on Ubuntu 16.04.3 LTS

```bash
sudo apt update
sudo apt upgrade

sudo apt install openssh-server curl

sudo mkdir /media/data

# Download, verify and extract Monero to /usr/local/bin
curl -L https://downloads.getmonero.org/cli/linux64 > /tmp/monero.tar.bz2
echo "6581506f8a030d8d50b38744ba7144f2765c9028d18d990beb316e13655ab248 /tmp/monero.tar.bz2" | sha256sum -c
tar -xf /tmp/monero.tar.bz2 -C /tmp && sudo mv /tmp/monero-v0.11.1.0/* /usr/local/bin/

monerod --version
# => Monero 'Helium Hydra' (v0.11.1.0-release)

# run daemon
monerod --detach

# will take a while to synchronize, view log with
tail -f /root/.bitmonero/bitmonero.log
```

```bash
apt install nginx letsencrypt
```

```nginx
server {
  server_name testnet.kasisto.io;

  listen [::]:18082 ssl;
  listen 18082 ssl;

  ssl_certificate /etc/letsencrypt/live/testnet.kasisto.io/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/testnet.kasisto.io/privkey.pem;

  charset UTF-8;

  location /json_rpc {
    proxy_http_version 1.1;
    proxy_pass http://127.0.0.1:18083/json_rpc;

    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
    add_header Access-Control-Allow-Headers "Origin, Authorization, Accept, Content-Type";
    add_header Access-Control-Allow-Credentials true;
  }
}
```

```bash
monero-wallet-rpc --rpc-bind-port 18083 --disable-rpc-login --wallet-file testnet
```
