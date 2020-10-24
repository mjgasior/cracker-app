import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useAddMarkerRoute = () => {
  const history = useHistory();

  return useCallback(
    ({ latitude, longitude }) => {
      history.push(`/markers/add/${latitude}/${longitude}`);
    },
    [history]
  );
};
