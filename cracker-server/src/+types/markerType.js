import { gql } from "apollo-server";

export const Marker = gql`
  type Marker {
    _id: ID!
    latitude: Float
    longitude: Float
    english: Description
    polish: Description
  }

  type Description {
    name: String
    content: String
  }

  extend type Query {
    markers: [Marker]
  }

  input MarkerInput {
    latitude: Float
    longitude: Float
    english: DescriptionInput
    polish: DescriptionInput
  }

  input DescriptionInput {
    name: String
    content: String
  }

  extend type Mutation {
    addMarker(marker: MarkerInput): Marker!
    removeMarker(id: ID): Marker!
  }
`;
