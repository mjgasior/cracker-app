import { useQuery } from "@apollo/react-hooks";
import { MARKERS } from "./queries";

export const useMarkers = () => useQuery(MARKERS);
