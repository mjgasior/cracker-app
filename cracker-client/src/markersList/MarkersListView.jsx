import React from "react";
import { List, Skeleton } from "antd";
import { useHistory } from "react-router-dom";
import { useCurrentLanguage } from "../+hooks/useCurrentLanguage";
import { MarkerAvatar } from "./MarkerAvatar";
import { useMarkerPages } from "./+hooks/useMarkerPages";

const PAGE_SIZE_LIMIT = 2;

export const MarkersListView = () => {
  const history = useHistory();
  const currentLanguage = useCurrentLanguage();
  const { data } = useMarkerPages(currentLanguage, 0, PAGE_SIZE_LIMIT);
  // https://www.apollographql.com/docs/react/v2/data/pagination/
  if (data) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data.getMarkers}
        pagination={{
          total: 10,
          onChange: (page) => {
            console.log(page);
          },
          pageSize: PAGE_SIZE_LIMIT,
        }}
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
