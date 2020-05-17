# Cracker server

Before starting the app please pepare a .env file which will include there values:

    AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN"
    AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"

## Snippets:

- `docker exec -it container_id_or_name ash` - starting shell in the Docker Alpine container (Alpine doesn't have bash by default)

## Run production build with Docker Compose:

For Docker Compose instructions refer to `cracker-product` repository.

## Run on Docker:

1. `docker build -t cracker-server:v1 .` - build the image
2. `docker run -d -p 4000:4000 cracker-server:v1` - run the image
3. `docker-machine ip default` - the website should be available at this IP on port 4000

## Packages:

- `apollo-server` - the core library for Apollo Server itself, which helps you define the shape of your data and how to fetch it
- `babel-cli` - Command Line Interface for Babel which can be used to compile files from the command line
- `babel-core` - toolchain that is mainly used to convert ECMAScript 2015+ (ES6) code into a backwards compatible version of JavaScript in current and older browsers or environments
- `babel-preset-env` - is a smart preset (preconfigured project settings) that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)
- `dotenv` - a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- `graphql` - the library used to build a GraphQL schema and execute queries against it
- `jsonwebtoken` - JsonWebToken implementation for Node.js
- `jwks-rsa` - a library to retrieve RSA public keys from a JWKS (JSON Web Key Set) endpoint
- `nodemon` - a utility that will monitor for any changes in your source and automatically restart your server

## Visual Studio Code extensions:

- **Apollo GraphQL** - rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform

## Resources:

- [Dockerizing Node.js applications (online exercise)](https://www.katacoda.com/courses/docker/3# "Katacoda course")
- [Enable ES6 (and beyond) syntax with Node and Express](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/)

- [Create a GraphQL API with Node, Mongoose, and Express](https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/)
- [GraphQL API using Docker + PostgreSQL + PostGraphile](https://medium.com/coderbunker/a-better-way-to-develop-your-graphql-api-using-docker-postgresql-postgraphile-7a1ae034b826)
- [Getting Started With MongoDB As A Docker Container Deployment](https://www.thepolyglotdeveloper.com/2019/01/getting-started-mongodb-docker-container-deployment/)
- [GQL and MongoDB](https://www.apollographql.com/blog/tutorial-building-a-graphql-server-cddaa023c035)
