import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import { Marker } from "./+types/markerType";
import { MarkerResolver } from "./+resolvers/markerResolver";
import { Version } from "./+types/versionType";
import { VersionResolver } from "./+resolvers/versionResolver";

const Base = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Base, Marker, Version],
  resolvers: [MarkerResolver, VersionResolver],
});
