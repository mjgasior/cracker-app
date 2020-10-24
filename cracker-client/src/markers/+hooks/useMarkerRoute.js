import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useMarkerRoute = () => {
  const history = useHistory();

  return useCallback(
    (selectedMarkerId) => {
      history.push(`/markers/${selectedMarkerId}`);
    },
    [history]
  );
};
