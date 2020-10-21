import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useUser } from "../+hooks/useUser";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkerRouteHandler } from "./+hooks/useMarkerRouteHandler";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);

  const routeHandler = useMarkerRouteHandler();

  useEffect(() => {
    if (match && data && currentMarker === null) {
      const marker = data.markers.find((x) => x._id === match.params.markerid);
      setCurrentMarker(marker);
    }
  }, [match, data, currentMarker]);

  return (
    <Row>
      <Col span={12}>
        <MapView
          isAllowed={isAdmin}
          data={data}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          onSelectedMarker={routeHandler}
        />
      </Col>
      <Col span={12}>
        <Description
          currentMarker={currentMarker}
          reset={() => setCurrentMarker(null)}
        />
      </Col>
    </Row>
  );
};
