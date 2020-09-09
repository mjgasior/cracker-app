FROM nginx:1.12-alpine

# bash and curl are not present in Alpine by default
# these two are installed only for development and debugging purposes
RUN apk add --no-cache bash
RUN apk add --no-cache curl

COPY ./nginx /etc/nginx/conf.d
COPY ./certs /etc/nginx

EXPOSE 80
EXPOSE 443

# How to run Nginx within a Docker container without halting?
# https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting
CMD ["nginx", "-g", "daemon off;"]