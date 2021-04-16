import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const markersQuery = loader("./getMarkers.gql");

export const useMarkers = (language) =>
  useQuery(markersQuery, {
    variables: { language },
  });
