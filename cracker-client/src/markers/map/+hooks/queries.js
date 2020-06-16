import { gql } from "apollo-boost";

export const ADD_MARKER = gql`
  mutation addMarker($position: [Float]) {
    addMarker(position: $position) {
      position
      _id
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
      position
      _id
    }
  }
`;
