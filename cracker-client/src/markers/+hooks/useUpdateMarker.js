import { useMutation } from "@apollo/react-hooks";
import { UPDATE_MARKER } from "./queries";

export const useUpdateMarker = () => {
  return useMutation(UPDATE_MARKER);
};
