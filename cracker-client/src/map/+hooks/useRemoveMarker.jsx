import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REMOVE_MARKER = gql`
  mutation removeMarker($id: ID) {
    removeMarker(id: $id)
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

export const useRemoveMarker = () => {
  return useMutation(REMOVE_MARKER, {
    update(cache, { data: { removeMarker } }) {
      const { markers } = cache.readQuery({ query: MARKERS });
      cache.writeQuery({
        query: MARKERS,
        data: { markers: markers.filter((x) => x._id !== removeMarker) },
      });
    },
  });
};
