import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export const useSelectedMarker = (data) => {
  const [selectedMarker, setSelectedMarker] = useState();
  const matchDetails = useRouteMatch("/markers/:markerid");
  const matchAdd = useRouteMatch("/markers/add/:latitude/:longitude");

  useEffect(() => {
    if (data && matchDetails && matchDetails.isExact) {
      const marker = data.markers.find(
        (x) => x._id === matchDetails.params.markerid
      );
      setSelectedMarker(marker);
    }
  }, [data, matchDetails, setSelectedMarker]);

  useEffect(() => {
    if (matchAdd && matchAdd.isExact) {
      setSelectedMarker((prev) => {
        const { latitude, longitude } = matchAdd.params;

        if (prev.latitude === latitude && prev.longitude === longitude) {
          return prev;
        }

        return {
          latitude: matchAdd.params.latitude,
          longitude: matchAdd.params.longitude,
        };
      });
    }
  }, [matchAdd, setSelectedMarker]);

  return selectedMarker;
};
