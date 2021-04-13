import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const MARKER_PAGE = gql`
  query getMarkers($language: String, $offset: Int, $limit: Int) {
    getMarkers(language: $language, offset: $offset, limit: $limit) {
      _id
      imageFilename
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

export const useMarkerPages = (language, offset, limit) =>
  useQuery(MARKER_PAGE, {
    variables: { language, offset, limit },
  });
