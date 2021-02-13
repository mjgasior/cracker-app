# Cracker server

## Table of Contents

- [Setup](#setup)
- [Snippets](#snippets)
- [Packages](#packages)
- [Visual Studio Code extensions](#visual-studio-code-extensions)
- [Errors](#errors)
- [Resources](#resources)

## Setup:

Before starting the app:

- run `docker run -p 27017:27017 -it mongo:4.2.6`
- please pepare a .env file which will include there values:

```
AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN"
AUDIENCE="http://your.api.identifier"
MONGODB_ADDRESS="YOUR_MONGODB_ADDRESS"
CORS_WHITELIST="CLIENT_ORIGIN_ADDRESS"
```

Example:

```
AUTH0_DOMAIN=domain.region.auth0.com
AUDIENCE=https://cracker.app
MONGODB_ADDRESS=192.168.99.100:27017
CORS_WHITELIST="https://192.168.99.100"
```

You can also define `IMAGE_DIRECTORY` variable to select the directory where the images should be saved. This path needs to be absolute. The default directory, which is used if this variable is not defined, is the `images` folder in `./cracker-server` directory (there is a `.gitignore` file which makes the `.jpg`, `.gif` and `.png` files not being sent to the repository). Files are renamed to selected marker id.

## Snippets:

- `docker exec -it container_id_or_name ash` - starting shell in the Docker Alpine container (Alpine doesn't have bash by default)
- `db.getCollection("users").find()` - show all users in [MongoDB Shell](https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell)
- sample mutation

```
  mutation {
    addUser(firstName: "Slavoj", lastName: "Žižek") {
      firstName
    }
  }
```

## Packages:

- `@babel/core` - toolchain that is mainly used to convert ECMAScript 2015+ (ES6) code into a backwards compatible version of JavaScript in current and older browsers or environments
- `@babel/node` - Command Line Interface (CLI) that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it
- `@babel/preset-env` - is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment
- `apollo-server-express` - this is the Express and Connect integration of Apollo GraphQL Server
- `dotenv` - a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- `graphql` - the library used to build a GraphQL schema and execute queries against it
- `graphql-auth` - a very simple middleware that easily integrates with any GraphQL server that follows the GraphQL API for resolvers
- `jsonwebtoken` - JsonWebToken implementation for Node.js
- `jwks-rsa` - a library to retrieve RSA public keys from a JWKS (JSON Web Key Set) endpoint to verify the token with the public key
- `nodemon` - a utility that will monitor for any changes in your source and automatically restart your server
- `mongoose` - mongodb object modeling for node.js
- `sharp` - high speed Node.js module to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions

## Visual Studio Code extensions:

- **Apollo GraphQL** - rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform

## Errors:

```bash
cracker-server-dev | Error: 'linux-x64' binaries cannot be used on the 'linuxmusl-x64' platform. Please remove the 'node_modules/sharp' directory and run 'npm install' on the 'linuxmusl-x64' platform.
```

There might be a [mismatch between environments](https://github.com/lovell/sharp/issues/1459#issuecomment-439352107) because of running `npm install` on Windows and then, running the app in Docker on Linux. If such error occurs, after `npm install` on Windows you need to run:

```bash
npm install --arch=x64 --platform=linuxmusl --target=8.10.0 sharp
```

## Resources:

- [Alphabetical sorting in MongoDB](https://stackoverflow.com/questions/14279924/mongoose-sort-alphabetically)
- [Authorization in Mongoose](https://mongoosejs.com/docs/connections.html)
- [Create a GraphQL API with graphql-compose-mongoose](https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/)
- [Dockerizing Node.js applications (online exercise)](https://www.katacoda.com/courses/docker/3# "Katacoda course")
- [Enable ES6 (and beyond) syntax with Node and Express](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/)
- [File Uploads with Apollo Server 2.0](https://www.apollographql.com/blog/file-uploads-with-apollo-server-2-0-5db2f3f60675/#File-upload-with-schema-param) (there is a bug that requires [scalar Upload](https://github.com/apollographql/apollo-server/issues/1317#issuecomment-403648624) to be defined for uploads to work properly)
- [Modularizing GraphQL schema code](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
- [The Beginner’s Guide to using GraphQL with Node and Mongo](https://medium.com/@williamyang93/graphql-apollo-mongodb-mongoose-part-i-a727bb22f1f6)
