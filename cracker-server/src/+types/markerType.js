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
    description: String
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    markers: [Marker]
    getMarkers(language: String): [Marker]
    uploads: [File]
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
    singleUpload(file: Upload!): File!
    addMarker(marker: MarkerInput): Marker!
    removeMarker(id: ID): Marker!
    updateMarker(id: ID, marker: MarkerInput): Marker!
  }
`;
