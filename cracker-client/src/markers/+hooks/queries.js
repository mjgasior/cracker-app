import { gql } from "apollo-boost";

export const ADD_MARKER = gql`
  mutation addMarker($marker: MarkerInput) {
    addMarker(marker: $marker) {
      _id
      latitude
      longitude
      polish {
        name
        content
      }
      english {
        name
        content
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
      latitude
      longitude
      polish {
        name
        content
      }
      english {
        name
        content
      }
    }
  }
`;
