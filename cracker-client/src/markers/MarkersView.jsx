import React from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkerRoute } from "./+hooks/useMarkerRoute";
import { useSelectedMarker } from "./+hooks/useSelectedMarker";

export const MarkersView = () => {
  const { data } = useMarkers();
  const selectedMarkerHandler = useMarkerRoute();
  const selectedMarker = useSelectedMarker(data);

  return (
    <Row>
      <Col span={12}>
        <MapView
          markersList={data}
          onSelectedMarker={selectedMarkerHandler}
          selectedMarker={selectedMarker}
        />
      </Col>
      <Col span={12}>
        <Description selectedMarker={selectedMarker} />
      </Col>
    </Row>
  );
};
