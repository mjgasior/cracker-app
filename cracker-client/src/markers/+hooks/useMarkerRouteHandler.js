import { useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

export const useMarkerRouteHandler = () => {
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
