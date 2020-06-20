import { gql } from "apollo-boost";

export const ADD_MARKER = gql`
  mutation addMarker($marker: MarkerInput) {
    addMarker(marker: $marker) {
      _id
      name
      latitude
      longitude
      description {
        polish
        english
      }
    }
  }
`;

export const REMOVE_MARKER = gql`
  mutation removeMarker($id: ID) {
    removeMarker(id: $id) {
      _id
    }
  }
`;

export const MARKERS = gql`
  {
    markers {
      _id
      name
      latitude
      longitude
      description {
        polish
        english
      }
    }
  }
`;
