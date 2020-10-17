import React from "react";
import { useParams } from "react-router-dom";

export const Foo = () => {
  let { markerid } = useParams();
  return <div>Now showing post {markerid}</div>;
};
