import { gql } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import { User } from "./+types/userType";
import { UserResolver } from "./+resolvers/userResolver";

import { Marker } from "./+types/markerType";
import { MarkerResolver } from "./+resolvers/markerResolver";

const Base = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Base, User, Marker],
  resolvers: [UserResolver, MarkerResolver],
});
