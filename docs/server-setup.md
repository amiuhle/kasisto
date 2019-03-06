# Server setup

The server consists of the following components:

* A full node (`monerod`)
* A view-only wallet accessed by `monero-wallet-rpc`
* `nginx` as a reverse proxy, serving HTTPS

## Setup guide

The following is based on a fresh Ubuntu Server 16.04.3 LTS. DigitalOcean's $5 standard plan with an attached Volume is good enough. You can use this [referral link](https://m.do.co/c/657f0844d1ed) to get a free $10 credit.

### Install monero

```bash
sudo apt update
sudo apt upgrade -y

# Download Monero
curl -L https://downloads.getmonero.org/cli/linux64 -o /tmp/monero.tar.bz2

# Verify checksum. This is for 0.14.0.0 release.
# For newer releases, see https://getmonero.org/downloads/#linux
echo "1e67163de7a924d65f30da251932ab31fdbccf8042d5e04ef63041709eec7854 /tmp/monero.tar.bz2" | sha256sum -c

# Extract to /usr/local/bin, omitting directories
tar -xf /tmp/monero.tar.bz2 -C /usr/local/bin --strip 2
rm /tmp/monero.tar.bz2

monerod --version
# => Monero 'Boron Butterfly' (v0.14.0.0-release)

# create a dedicated user to run monero daemon and wallet
sudo adduser monero

# create folder for wallets
su monero
mkdir /home/monero/wallets
```

Create a [view only wallet](https://getmonero.org/resources/user-guides/view_only.html) and upload it to `/home/monero/wallets`.

### Configure monero services

```bash
# install supervisor
sudo apt install supervisor -y

# /etc/supervisor/conf.d/monerod.conf
[program:monerod]
command=monerod --data-dir /home/monero/.bitmonero
directory=/home/monero
autostart=true
autorestart=true
user=monero
stderr_logfile=/var/log/supervisor/monerod.err.log
stdout_logfile=/var/log/supervisor/monerod.out.log

# /etc/supervisor/conf.d/monero-wallet-rpc.conf
[program:monero-wallet-rpc]
command=monero-wallet-rpc --rpc-bind-port 18083 --disable-rpc-login --wallet-file /home/monero/wallets/wallet-name --password ''
directory=/home/monero
autostart=true
autorestart=true
user=monero
stderr_logfile=/var/log/supervisor/monero-wallet-rpc.err.log
stdout_logfile=/var/log/supervisor/monero-wallet-rpc.out.log

# restart supervisor to start monerod and monero-wallet-rpc
sudo service supervisor restart
```

`monerod` will synchronize with the network, which will take some time. On DigitalOcean, you can speed up this process by resizing your droplet (without resizing disk space). After synchronization, you can resize back down to the original size.

Check progress with `monerod status` or by viewing the log file.

### Set up `nginx` reverse proxy with TLS

You will need an SSL certificate. You can use [LetsEncrypt](https://letsencrypt.org/) or any other certificate. If you use a self-signed certificate, you must import it on the mobile device you use Kasisto on ([Android](https://coderwall.com/p/wv6fpq/add-self-signed-ssl-certificate-to-android-for-browsing) | iOS).

```bash
sudo apt install nginx -y
```

Create an nginx configuration in `/etc/nginx/sites-available/` and symlink it to`/etc/nginx/sites-enabled/`. This file determines what has to be configured in
[Kasisto's settings](https://amiuhle.github.io/kasisto/#/settings).

According to the example below, the **Wallet URL** would be
`https://example.com:18082/json_rpc`. You can host several view-only
wallets using the same nginx instance. Each wallet will need its own
`monero-wallet-rpc` instance running on an individual port. Point
the `proxy_pass` to the corresponding local port of the wallet and
adjust the `location` parameter accordingly.

See below for **Username** and **Password** settings.

```nginx
server {
  server_name example.com;

  listen [::]:18082 ssl;
  listen 18082 ssl;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  charset UTF-8;

  # `/json_rpc` can be any `/path`
  location /json_rpc {
    # Optional HTTP Basic Authentication
    # auth_basic "Restricted";
    # auth_basic_user_file /etc/nginx/.htpasswd;

    proxy_http_version 1.1;
    proxy_pass http://127.0.0.1:18083/json_rpc;

    add_header Access-Control-Allow-Origin https://amiuhle.github.io always;
    add_header Access-Control-Allow-Methods "POST, GET, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Origin, Authorization, Accept, Content-Type" always;
    add_header Access-Control-Allow-Credentials true always;

     if ($request_method = 'OPTIONS') {
      add_header Access-Control-Allow-Origin https://amiuhle.github.io always;
      add_header Access-Control-Allow-Methods "POST, GET, OPTIONS" always;
      add_header Access-Control-Allow-Headers "Origin, Authorization, Accept, Content-Type" always;
      add_header Access-Control-Allow-Credentials true always;

      # Tell client that this pre-flight info is valid for 20 days
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain charset=UTF-8';
      add_header 'Content-Length' 0;
      return 204;
    }
  }
}
```

#### Authentication

Currently only HTTP Basic Authentication is supported. Since HTTPS is required, the password will not be sent over the network unencrypted.

Using apache2-utils, create a password file in `/etc/nginx/.htpasswd`.
This file is referenced in the nginx configuration above. If several
wallets are configured, it most likely makes sense to use a password
file for each `location` configuration.
`user1` can be any username, this and the password entered must be
adjusted in the Kasisto settings.

```bash
sudo apt install apache2-utils -y

sudo htpasswd -c /etc/nginx/.htpasswd user1
```

Enter and confirm the password and enable authentication commenting in the two `auth_basic` lines in the nginx configuration.
