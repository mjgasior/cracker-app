import React from "react";
import { List, Avatar, Skeleton } from "antd";
import { useMarkers } from "./+hooks/useMarkers";

export const MarkersListView = () => {
  const { data } = useMarkers();
  if (data) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data.markers}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    color: "#bbb",
                    backgroundColor: "#ffd42a",
                  }}
                >
                  {item.english.name[0].toUpperCase()}
                </Avatar>
              }
              title={<a href="https://ant.design">{item.english.name}</a>}
              description={item.english.description}
            />
          </List.Item>
        )}
      />
    );
  }
  return <Skeleton avatar paragraph={{ rows: 4 }} />;
};
