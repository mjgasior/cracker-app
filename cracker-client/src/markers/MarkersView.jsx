import React, { useState } from "react";
import { Row, Col } from "antd";
import { MapView } from "./map/MapView";
import { Description } from "./description/Description";
import { MarkerContext } from "./+context/MarkerContext";
import { useUser } from "../+hooks/useUser";
import { Image } from "./+components/Image";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Foo } from "./Foo";
import { useMarkers } from "./+hooks/useMarkers";

export const MarkersView = () => {
  const { data } = useMarkers();
  const { path } = useRouteMatch();
  const { isAdmin } = useUser();
  const [currentMarker, setCurrentMarker] = useState(null);

  return (
    <MarkerContext.Provider value={{ currentMarker, setCurrentMarker }}>
      <Row>
        <Col span={12}>
          <MapView isAllowed={isAdmin} data={data} />
        </Col>
        <Col span={12}>
          <Description />
        </Col>
      </Row>
      {currentMarker && (
        <Row>
          <Col span={12}>
            <Image marker={currentMarker} width={300} height={200} />
          </Col>
          <Col span={12}>
            <Switch>
              <Route path={`${path}/:markerid`} component={Foo} />
            </Switch>
          </Col>
        </Row>
      )}
    </MarkerContext.Provider>
  );
};
