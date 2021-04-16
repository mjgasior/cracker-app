import { gql } from "@apollo/client";

export const ADD_MARKER = gql`
  mutation addMarker($marker: MarkerInput) {
    addMarker(marker: $marker) {
      _id
      latitude
      longitude
      polish {
        name
        description
      }
      english {
        name
        description
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

export const UPDATE_MARKER = gql`
  mutation updateMarker($id: ID, $marker: MarkerInput) {
    updateMarker(id: $id, marker: $marker) {
      _id
    }
  }
`;
