import { useRouteMatch } from "react-router-dom";

export const useMarkerRouteMatch = () => {
  const match = useRouteMatch("/markers/:markerid");
  if (match && match.isExact) {
    return match.params.markerid;
  }
  return null;
};
