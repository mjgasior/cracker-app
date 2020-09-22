import { useQuery } from "@apollo/client";
import { MARKERS } from "./queries";

export const useMarkers = (language) =>
  useQuery(MARKERS, {
    variables: { language },
  });
