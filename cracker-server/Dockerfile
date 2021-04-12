FROM node:lts-alpine

# bash, curl and openrc are not present in Alpine by default
# bash and curl are installed only for development and debugging purposes
# openrc allows to see the status of services and start, stop and restart them 
RUN apk add --no-cache bash
RUN apk add --no-cache curl
RUN apk add --no-cache openrc

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json
COPY package-lock.json /src/app/package-lock.json

RUN npm ci

# If you don't want to use the cache as part of the build then set the option --no-cache=true as part of the docker build command.

COPY . /src/app

RUN mkdir -p /src/app/images

EXPOSE 4000

CMD ["npm", "start"]