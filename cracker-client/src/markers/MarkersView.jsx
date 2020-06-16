import React, { useState } from "react";
import auth from "../+utils/Auth";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { MarkerContext } from "./+context/MarkerContext";

export const MarkersView = () => {
  const isAllowed = auth.isAuthenticated() && auth.isUserAdmin();
  const [currentMarker, setCurrentMarker] = useState(null);

  return (
    <MarkerContext.Provider value={{ currentMarker, setCurrentMarker }}>
      <Row>
        <Col span={12}>
          <MapView isAllowed={isAllowed} />
        </Col>
        <Col span={12}>
          <Description />
        </Col>
      </Row>
    </MarkerContext.Provider>
  );
};
