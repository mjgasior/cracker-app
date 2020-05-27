import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const MARKERS = gql`
  {
    markers {
      position
      _id
    }
  }
`;

export const useMarkers = () => useQuery(MARKERS);
