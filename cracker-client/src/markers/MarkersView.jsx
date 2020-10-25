import React from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkerRoute } from "./+hooks/useMarkerRoute";
import { useAddMarkerRoute } from "./+hooks/useAddMarkerRoute";
import { useSelectedMarker } from "./+hooks/useSelectedMarker";
import { useDeleteMarkerHandler } from "./+hooks/useDeleteMarkerHandler";
import { useUser } from "../+hooks/useUser";
import { useCreateMarkerHandler } from "./+hooks/useCreateMarkerHandler";
import { useUpdateMarkerHandler } from "./+hooks/useUpdateMarkerHandler";

export const MarkersView = () => {
  const { isAdmin } = useUser();
  const { data } = useMarkers();
  const selectedMarker = useSelectedMarker(data);
  const selectedMarkerHandler = useMarkerRoute();
  const addMarkerHandler = useAddMarkerRoute(isAdmin);
  const deleteMarkerHandler = useDeleteMarkerHandler();
  const createMarkerHandler = useCreateMarkerHandler();
  const updateMarkerHandler = useUpdateMarkerHandler();

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
          isAllowed={isAdmin}
          selectedMarker={selectedMarker}
          onDeleteMarker={deleteMarkerHandler}
          onCreateMarker={createMarkerHandler}
          onUpdateMarker={updateMarkerHandler}
        />
      </Col>
    </Row>
  );
};
