import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const useDeleteMarkerRoute = () => {
  const history = useHistory();

  return useCallback(() => {
    history.push(`/markers`);
  }, [history]);
};
