import React from "react";
import { Breadcrumb } from "antd";

export const Home = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h2>Home</h2>
        <p>
          This is the environment build: <i>{process.env.NODE_ENV}</i>
        </p>
        <p>{process.env.REACT_APP_API_URL}</p>
        <p>{process.env.REACT_APP_AUTH0_ORIGIN}</p>
      </div>
    </>
  );
};
