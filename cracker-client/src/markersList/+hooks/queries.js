import { gql } from "apollo-boost";

export const MARKERS = gql`
  query {
    getMarkers(language: "english") {
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
