import React from "react";
import styled from "styled-components";
import { List, Avatar, Skeleton } from "antd";
import { useMarkers } from "./+hooks/useMarkers";
import { useCurrentLanguage } from "./+hooks/useCurrentLanguage";
import { useHistory } from "react-router-dom";

const StyledAvatar = styled(Avatar)`
  color: #bbb;
  background-color: #ffd42a;
`;

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
                <StyledAvatar>
                  {item[currentLanguage].name[0].toUpperCase()}
                </StyledAvatar>
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
