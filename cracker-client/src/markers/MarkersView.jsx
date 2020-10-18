import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useUser } from "../+hooks/useUser";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkersRoute } from "./+hooks/useMarkersRoute";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);
  const hasMarkerId = useMarkersRoute();

  return (
    <Row>
      <Col span={12}>
        <MapView
          isAllowed={isAdmin}
          data={data}
          currentMarker={currentMarker}
          setCurrentMarker={setCurrentMarker}
          hasMarkerId={hasMarkerId}
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
