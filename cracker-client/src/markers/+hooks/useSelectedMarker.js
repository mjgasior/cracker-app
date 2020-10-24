import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export const useSelectedMarker = (data) => {
  const [selectedMarker, setSelectedMarker] = useState();
  const match = useRouteMatch("/markers/:markerid");

  useEffect(() => {
    if (data && match && match.isExact) {
      const marker = data.markers.find((x) => x._id === match.params.markerid);
      setSelectedMarker(marker);
    }
  }, [data, match, setSelectedMarker]);

  return selectedMarker;
};
