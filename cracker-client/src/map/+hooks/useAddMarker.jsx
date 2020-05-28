import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_MARKER = gql`
  mutation addMarker($position: [Float]) {
    addMarker(position: $position) {
      position
      _id
    }
  }
`;

const MARKERS = gql`
  {
    markers {
      position
      _id
    }
  }
`;

export const useAddMarker = () => {
  return useMutation(ADD_MARKER, {
    update(cache, { data: { addMarker } }) {
      const { markers } = cache.readQuery({ query: MARKERS });
      cache.writeQuery({
        query: MARKERS,
        data: { markers: markers.concat([addMarker]) },
      });
    },
  });
};
