import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REMOVE_MARKER = gql`
  mutation removeMarker($id: ID) {
    removeMarker(id: $id)
  }
`;

export const useRemoveMarker = () => {
  return useMutation(REMOVE_MARKER);
};
