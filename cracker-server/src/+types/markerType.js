import { gql } from "apollo-server";

export const Marker = gql`
  type Marker {
    _id: ID!
    latitude: Float
    longitude: Float
    description: Description
  }

  type Description {
    english: String
    polish: String
  }

  extend type Query {
    markers: [Marker]
  }

  input MarkerInput {
    latitude: Float
    longitude: Float
    description: DescriptionInput
  }

  input DescriptionInput {
    english: String
    polish: String
  }

  extend type Mutation {
    addMarker(marker: MarkerInput): Marker!
    removeMarker(id: ID): Marker!
  }
`;
