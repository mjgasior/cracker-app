import React from "react";
import { List, Skeleton } from "antd";
import { useMarkers } from "./+hooks/useMarkers";
import { useHistory } from "react-router-dom";
import { useCurrentLanguage } from "../+hooks/useCurrentLanguage";
import { MarkerAvatar } from "./MarkerAvatar";

export const MarkersListView = () => {
  const history = useHistory();
  const currentLanguage = useCurrentLanguage();
  const { data } = useMarkers(currentLanguage);
  if (data) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data.getMarkers}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <MarkerAvatar
                  name={item[currentLanguage].name[0]}
                  imageFilename={item.imageFilename}
                />
              }
              title={
                <button onClick={() => history.push(`markers/${item._id}`)}>
                  {item[currentLanguage].name}
                </button>
              }
              description={item[currentLanguage].description}
            />
          </List.Item>
        )}
      />
    );
  }
  return <Skeleton avatar paragraph={{ rows: 4 }} />;
};
