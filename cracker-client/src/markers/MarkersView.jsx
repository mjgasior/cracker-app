import React, { useCallback, useState, useEffect } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { useUser } from "../+hooks/useUser";
import { useMarkers } from "./+hooks/useMarkers";
import { useRouteMatch, useHistory } from "react-router-dom";

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
  }, [match, data, currentMarker]);

  const routeHandler = useCallback(() => {
    if (currentMarker) {
      if (match && match.isExact) {
        history.replace(currentMarker._id);
      } else {
        history.push(`/markers/${currentMarker._id}`);
      }
    }
  }, [history, currentMarker, match]);

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
