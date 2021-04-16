import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const markersQuery = loader("./queries/markers.gql");

export const useMarkers = () => useQuery(markersQuery);
