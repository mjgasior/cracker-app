import { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export const useMarkerRoute = () => {
  const history = useHistory();
  const match = useRouteMatch("/markers/:markerid");

  return useCallback(
    (selectedMarkerId) => {
      if (match && match.isExact) {
        history.replace(selectedMarkerId);
      } else {
        history.push(`/markers/${selectedMarkerId}`);
      }
    },
    [history, match]
  );
};
