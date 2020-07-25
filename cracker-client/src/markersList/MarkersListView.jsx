import React from "react";
import styled from "styled-components";
import { List, Avatar, Skeleton } from "antd";
import { useMarkers } from "./+hooks/useMarkers";

const StyledAvatar = styled(Avatar)`
  color: #bbb;
  background-color: #ffd42a;
`;

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
                <StyledAvatar>
                  {item.english.name[0].toUpperCase()}
                </StyledAvatar>
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
