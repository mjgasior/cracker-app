import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useUser } from "../+hooks/useUser";
import { useMarkers } from "./+hooks/useMarkers";
import { useHistory, useRouteMatch } from "react-router-dom";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);

  const history = useHistory();
  const match = useRouteMatch("/markers/:markerid");

  useEffect(() => {
    if (match && data && currentMarker === null) {
      const marker = data.markers.find((x) => x._id === match.params.markerid);
      setCurrentMarker(marker);
    }
  }, [match, data, currentMarker, setCurrentMarker]);

  const routeHandler = useCallback(
    (selectedMarkerId) => {
      if (match && match.isExact) {
        history.replace(selectedMarkerId);
      } else {
        history.push(`/markers/${selectedMarkerId}`);
      }
    },
    [history, match]
  );

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
          reset={() => {
            history.push(`/markers`);
            setCurrentMarker(null);
          }}
        />
      </Col>
    </Row>
  );
};
