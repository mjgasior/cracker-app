import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_MARKER = gql`
  mutation addMarker($position: [Float]) {
    addUser(position: $position) {
      position
    }
  }
`;

export const useAddMarker = () => {
  return useMutation(ADD_MARKER);
};
