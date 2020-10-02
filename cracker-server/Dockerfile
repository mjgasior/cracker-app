FROM node:lts-alpine

# bash and curl are not present in Alpine by default
# these two are installed only for development and debugging purposes
RUN apk add --no-cache bash
RUN apk add --no-cache curl

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install

# If you don't want to use the cache as part of the build then set the option --no-cache=true as part of the docker build command.

COPY . /src/app

RUN mkdir -p /src/app/images

EXPOSE 4000

CMD ["npm", "start"]