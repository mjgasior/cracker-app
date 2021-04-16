import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const updateMarkerQuery = loader("./queries/updateMarker.gql");

export const useUpdateMarker = () => {
  return useMutation(updateMarkerQuery);
};
