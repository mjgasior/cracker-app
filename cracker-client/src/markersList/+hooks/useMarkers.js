import { useQuery } from "@apollo/react-hooks";
import { MARKERS } from "./queries";

export const useMarkers = (language) =>
  useQuery(MARKERS, {
    variables: { language },
  });
