FROM ubuntu:16.04

ENV MONERO_VERSION 0.11.0.0
ENV MONERO_SHA256 fa7742c822f3c966aa842bf20a9920803d690d9db02033d9b397cefc7cc07ff4


RUN apt-get -y update && apt-get install -y \
  bzip2 \
  curl

RUN curl https://downloads.getmonero.org/cli/monero-linux-x64-v${MONERO_VERSION}.tar.bz2 > /tmp/monero.tar.bz2

RUN echo "${MONERO_SHA256} /tmp/monero.tar.bz2" | sha256sum -c

RUN tar -xf /tmp/monero.tar.bz2 -C /tmp \
    && mv /tmp/monero-v${MONERO_VERSION}/* /usr/local/bin/ \
    && rm -rf /tmp/monero-v${MONERO_VERSION}

