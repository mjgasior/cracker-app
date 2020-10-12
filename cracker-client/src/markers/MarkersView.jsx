import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { MarkerContext } from "./+context/MarkerContext";
import { useUser } from "../+hooks/useUser";

export const MarkersView = () => {
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);

  return (
    <MarkerContext.Provider value={{ currentMarker, setCurrentMarker }}>
      <Row>
        <Col span={12}>
          <MapView isAllowed={isAdmin} />
        </Col>
        <Col span={12}>
          <Description />
        </Col>
      </Row>
      {currentMarker && <Row>
        <Col span={12}>
          <img src={`/images/${currentMarker._id}.jpg`}/>
        </Col>
      </Row>}
    </MarkerContext.Provider>
  );
};
