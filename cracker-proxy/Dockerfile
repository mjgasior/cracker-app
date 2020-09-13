FROM nginx:1.19-alpine

# bash and curl are not present in Alpine by default
# these two are installed only for development and debugging purposes
RUN apk add --no-cache bash
RUN apk add --no-cache curl

CMD ["nginx", "-g", "daemon off;"]