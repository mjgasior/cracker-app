import { useMutation } from "@apollo/client";
import { UPDATE_MARKER } from "./queries";

export const useUpdateMarker = () => {
  return useMutation(UPDATE_MARKER);
};
