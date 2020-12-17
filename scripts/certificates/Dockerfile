FROM alpine:edge

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

# this keeps the Docker image running
# http://bigdatums.net/2017/11/07/how-to-keep-docker-containers-running/
CMD tail -f /dev/null