# Cracker server

Before starting the app:

- run `docker run -p 27017:27017 -it mongo:4.2.6`
- please pepare a .env file which will include there values:

```
AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN"
AUTH0_CLIENT_ID="YOUR_AUTH0_CLIENT_ID"
MONGODB_ADDRESS="YOUR_MONGODB_ADDRESS"
```

Example:

```
AUTH0_DOMAIN=domain.region.auth0.com
AUTH0_CLIENT_ID=i6mdgjdsjs45asdmfdg3453TADasdkaa
MONGODB_ADDRESS=192.168.99.100:27017
```

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
- `jsonwebtoken` - JsonWebToken implementation for Node.js
- `jwks-rsa` - a library to retrieve RSA public keys from a JWKS (JSON Web Key Set) endpoint
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
- [Modularizing GraphQL schema code](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2)
- [The Beginner’s Guide to using GraphQL with Node and Mongo](https://medium.com/@williamyang93/graphql-apollo-mongodb-mongoose-part-i-a727bb22f1f6)
