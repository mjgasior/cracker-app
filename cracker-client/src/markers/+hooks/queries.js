import { gql } from "@apollo/client";

export const UPDATE_MARKER = gql`
  mutation updateMarker($id: ID, $marker: MarkerInput) {
    updateMarker(id: $id, marker: $marker) {
      _id
    }
  }
`;
