import { gql } from "apollo-server-express";

export const Marker = gql`
  scalar Upload

  type Marker {
    _id: ID!
    latitude: Float
    longitude: Float
    english: Description
    polish: Description
  }

  type Description {
    name: String
    description: String
  }

  extend type Query {
    markers: [Marker]
    getMarkers(language: String): [Marker]
  }

  input MarkerInput {
    latitude: Float
    longitude: Float
    english: DescriptionInput
    polish: DescriptionInput
  }

  input DescriptionInput {
    name: String
    description: String
  }

  extend type Mutation {
    singleUpload(id: ID, file: Upload!): Boolean
    addMarker(marker: MarkerInput): Marker!
    removeMarker(id: ID): Marker!
    updateMarker(id: ID, marker: MarkerInput): Marker!
  }
`;
