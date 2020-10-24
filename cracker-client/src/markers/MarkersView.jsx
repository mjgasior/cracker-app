import React from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkerRoute } from "./+hooks/useMarkerRoute";
import { useAddMarkerRoute } from "./+hooks/useAddMarkerRoute";
import { useSelectedMarker } from "./+hooks/useSelectedMarker";
import { useDeleteMarkerRoute } from "./+hooks/useDeleteMarkerRoute";

export const MarkersView = () => {
  const { data } = useMarkers();
  const selectedMarker = useSelectedMarker(data);
  const selectedMarkerHandler = useMarkerRoute();
  const addMarkerHandler = useAddMarkerRoute();
  const deleteMarkerHandler = useDeleteMarkerRoute();

  return (
    <Row>
      <Col span={12}>
        <MapView
          markersList={data}
          onSelectedMarker={selectedMarkerHandler}
          selectedMarker={selectedMarker}
          onAddNewMarker={addMarkerHandler}
        />
      </Col>
      <Col span={12}>
        <Description
          selectedMarker={selectedMarker}
          onDeletedMarker={deleteMarkerHandler}
          onCreatedMarker={selectedMarkerHandler}
        />
      </Col>
    </Row>
  );
};
