import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAddMarker } from "./useAddMarker";

export const useCreateMarkerHandler = () => {
  const history = useHistory();
  const [addMarker] = useAddMarker();

  return useCallback(
    async (newMarker) => {
      const response = await addMarker({
        variables: { marker: newMarker },
      });

      history.push(`/markers/${response.data.addMarker._id}`);
    },
    [history, addMarker]
  );
};
