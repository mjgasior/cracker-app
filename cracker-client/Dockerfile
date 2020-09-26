FROM node:lts-alpine AS build-dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

RUN npm run build

FROM nginx:1.19-alpine

# bash and curl are not present in Alpine by default
# these two are installed only for development and debugging purposes
RUN apk add --no-cache bash
RUN apk add --no-cache curl

COPY --from=build-dependencies /usr/src/app/build /usr/share/nginx/html
COPY --from=build-dependencies /usr/src/app/nginx /etc/nginx/conf.d
COPY --from=build-dependencies /usr/src/app/test /var/www/certbot

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]