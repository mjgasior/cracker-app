import { gql } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import { Book } from "./+types/bookType";
import { User } from "./+types/userType";

import { BookResolver } from "./+resolvers/bookResolver";
import { UserResolver } from "./+resolvers/userResolver";

const Base = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Base, Book, User],
  resolvers: [BookResolver, UserResolver],
});
