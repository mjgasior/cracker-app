import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRemoveMarker } from "./useRemoveMarker";

export const useDeleteMarkerHandler = () => {
  const history = useHistory();
  const [removeMarker] = useRemoveMarker();

  return useCallback(
    async (id) => {
      await removeMarker({ variables: { id } });
      history.push(`/markers`);
    },
    [history, removeMarker]
  );
};
