# Cracker server

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

You can also define `IMAGE_DIRECTORY` variable to select the directory where the images should be saved. This path needs to be absolute. The default directory, which is used if this variable is not defined, is the `images` folder in `./cracker-server` directory.

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
- `apollo-server` - the core library for Apollo Server itself, which helps you define the shape of your data and how to fetch it
- `dotenv` - a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- `graphql` - the library used to build a GraphQL schema and execute queries against it
- `graphql-auth` - a very simple middleware that easily integrates with any GraphQL server that follows the GraphQL API for resolvers
- `jsonwebtoken` - JsonWebToken implementation for Node.js
- `jwks-rsa` - a library to retrieve RSA public keys from a JWKS (JSON Web Key Set) endpoint to verify the token with the public key
- `nodemon` - a utility that will monitor for any changes in your source and automatically restart your server
- `mongoose` - mongodb object modeling for node.js

## Visual Studio Code extensions:

- **Apollo GraphQL** - rich editor support for GraphQL client and server development that seamlessly integrates with the Apollo platform

## Resources:

- [Alphabetical sorting in MongoDB](https://stackoverflow.com/questions/14279924/mongoose-sort-alphabetically)
- [Authorization in Mongoose](https://mongoosejs.com/docs/connections.html)
- [Create a GraphQL API with graphql-compose-mongoose](https://getstream.io/blog/tutorial-create-a-graphql-api-with-node-mongoose-and-express/)
- [Dockerizing Node.js applications (online exercise)](https://www.katacoda.com/courses/docker/3# "Katacoda course")
- [Enable ES6 (and beyond) syntax with Node and Express](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/)
- [File Uploads with Apollo Server 2.0](https://www.apollographql.com/blog/file-uploads-with-apollo-server-2-0-5db2f3f60675/#File-upload-with-schema-param) (there is a bug that requires [scalar Upload](https://github.com/apollographql/apollo-server/issues/1317#issuecomment-403648624) to be defined for uploads to work properly)
- [Modularizing GraphQL schema code](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
- [The Beginner’s Guide to using GraphQL with Node and Mongo](https://medium.com/@williamyang93/graphql-apollo-mongodb-mongoose-part-i-a727bb22f1f6)
