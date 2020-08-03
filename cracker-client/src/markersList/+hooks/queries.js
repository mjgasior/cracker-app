import { gql } from "apollo-boost";

export const MARKERS = gql`
  query getMarkers($language: String) {
    getMarkers(language: $language) {
      _id
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
