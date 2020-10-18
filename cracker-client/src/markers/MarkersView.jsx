import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { MarkerContext } from "./+context/MarkerContext";
import { useUser } from "../+hooks/useUser";
import { Image } from "./description/+components/Image";
import { useMarkers } from "./+hooks/useMarkers";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);

  return (
    <MarkerContext.Provider value={{ currentMarker, setCurrentMarker }}>
      <Row>
        <Col span={12}>
          <MapView isAllowed={isAdmin} data={data} />
        </Col>
        <Col span={12}>
          <Description data={data} />
        </Col>
        {currentMarker && (
          <Col span={12}>
            <Image marker={currentMarker} width={300} height={200} />
          </Col>
        )}
      </Row>
    </MarkerContext.Provider>
  );
};
