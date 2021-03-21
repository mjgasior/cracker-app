FROM node:lts-alpine AS build-dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./

RUN npm run build

FROM nginx:1.19-alpine

# bash, curl and openrc are not present in Alpine by default
# bash and curl are installed only for development and debugging purposes
# openrc allows to see the status of services and start, stop and restart them 
RUN apk add --no-cache bash
RUN apk add --no-cache curl
RUN apk add --no-cache openrc

COPY --from=build-dependencies /usr/src/app/build /usr/share/nginx/html
COPY --from=build-dependencies /usr/src/app/nginx /etc/nginx/conf.d

RUN curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "/etc/nginx/conf.d/options-ssl-nginx.conf"
RUN curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "/etc/nginx/conf.d/ssl-dhparams.pem"

CMD ["nginx", "-g", "daemon off;"]