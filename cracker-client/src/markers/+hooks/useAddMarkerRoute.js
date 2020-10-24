import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useAddMarkerRoute = (isAdmin) => {
  const history = useHistory();

  return useCallback(
    ({ latitude, longitude }) => {
      if (isAdmin) {
        history.push(`/markers/add/${latitude}/${longitude}`);
      }
    },
    [history, isAdmin]
  );
};
