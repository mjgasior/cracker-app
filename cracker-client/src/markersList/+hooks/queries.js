import { gql } from "apollo-boost";

export const MARKERS = gql`
  {
    markers {
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
