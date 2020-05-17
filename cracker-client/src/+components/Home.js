import React from "react";

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        This is the environment build: <i>{process.env.NODE_ENV}</i>
      </p>
      <p>{process.env.REACT_APP_API_URL}</p>
      <p>{process.env.REACT_APP_AUTH0_ORIGIN}</p>
      <p>{process.env.REACT_APP_AUTH0_DOMAIN}</p>
      <p>{process.env.REACT_APP_AUTH0_CLIENT_ID}</p>
    </div>
  );
}
