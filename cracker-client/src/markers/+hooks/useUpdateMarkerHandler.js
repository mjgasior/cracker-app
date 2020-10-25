import { useCallback } from "react";
import { useUpdateMarker } from "./useUpdateMarker";

export const useUpdateMarkerHandler = () => {
  const [updateMarker] = useUpdateMarker();

  return useCallback(
    async (id, marker) => {
      await updateMarker({ variables: { id, marker } });
    },
    [updateMarker]
  );
};
