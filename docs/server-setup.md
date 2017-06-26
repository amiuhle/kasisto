# Server setup

Based on Ubuntu 16.04.2 LTS

```bash
sudo apt update
sudo apt upgrade

sudo apt install openssh-server curl

sudo mkdir /media/data

# Download, verify and extract Monero to /usr/local/bin
curl -L https://downloads.getmonero.org/cli/linux64 > /tmp/monero.tar.bz2
echo "8db80f8cc4f80d4106db807432828df730a59eac78972ea81652aa6b9bac04ad /tmp/monero.tar.bz2" | sha256sum -c
tar -xf /tmp/monero.tar.bz2 -C /tmp && sudo mv /tmp/monero-v0.10.3.1/* /usr/local/bin/

monerod --version
# => Monero 'Wolfram Warptangent' (v0.10.3.1-release)


```
