import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const markersQuery = loader("./markers.gql");

export const useMarkers = () => useQuery(markersQuery);
