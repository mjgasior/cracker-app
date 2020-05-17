import React from "react";

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        This is the environment build: <i>{process.env.NODE_ENV}</i>
      </p>
    </div>
  );
}
