import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export const useSelectedMarker = (data) => {
  const [selectedMarker, setSelectedMarker] = useState();
  const matchDetails = useRouteMatch("/markers/:markerid");
  const matchAdd = useRouteMatch("/markers/add/:latitude/:longitude");
  const matchNone = useRouteMatch("/markers");

  useEffect(() => {
    if (matchNone && matchNone.isExact) {
      setSelectedMarker(null);
    }
  }, [matchNone, setSelectedMarker]);

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

        const numericLatitude = Number(latitude);
        const numericLongitude = Number(longitude);

        if (
          prev &&
          prev.latitude === numericLatitude &&
          prev.longitude === numericLongitude
        ) {
          return prev;
        }

        return {
          latitude: numericLatitude,
          longitude: numericLongitude,
        };
      });
    }
  }, [matchAdd, setSelectedMarker]);

  return selectedMarker;
};
