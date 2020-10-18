import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useUser } from "../+hooks/useUser";
import { useMarkers } from "./+hooks/useMarkers";
import { useRouteMatch } from "react-router-dom";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);
  const match = useRouteMatch("/markers/:markerid");

  if (match && data && currentMarker === null) {
    const marker = data.markers.find((x) => x._id === match.params.markerid);
    setCurrentMarker(marker);
  }

  return (
    <Row>
      <Col span={12}>
        <MapView
          isAllowed={isAdmin}
          data={data}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          hasMarkerId={match && match.isExact}
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
