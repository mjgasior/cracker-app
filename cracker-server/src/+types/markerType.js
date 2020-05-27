import { gql } from "apollo-server";

export const Marker = gql`
  type Marker {
    id: ID!
    position: [Float]
  }

  extend type Query {
    markers: [Marker]
  }

  extend type Mutation {
    addMarker(position: [Float]): Marker!
  }
`;
