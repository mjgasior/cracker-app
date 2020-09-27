import { useQuery } from "@apollo/client";
import { MARKERS } from "./queries";

export const useMarkers = () => useQuery(MARKERS);
