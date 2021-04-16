import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

const query = loader("./markers.gql");

export const useMarkers = () => useQuery(query);
