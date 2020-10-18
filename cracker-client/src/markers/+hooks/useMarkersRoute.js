import { useRouteMatch } from "react-router-dom";

export const useMarkersRoute = () => {
  const match = useRouteMatch("/markers/:markerid");
  return match && match.isExact;
};
