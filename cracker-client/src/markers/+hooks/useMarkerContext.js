import { useContext } from "react";
import { MarkerContext } from "../+context/MarkerContext";

export const useMarkerContext = () => {
  return useContext(MarkerContext);
};
