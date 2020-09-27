import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { MarkerContext } from "./+context/MarkerContext";
import { UploadFile } from "./UploadFile";
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
        <Col span={12}>
          <UploadFile />
        </Col>
      </Row>
    </MarkerContext.Provider>
  );
};
