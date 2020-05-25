import React from "react";
import { useUser } from "./+hooks/useUser";

export const Users = () => {
  const { loading, error, data } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      {data.users.map((x) => (
        <div key={x.firstName}>
          {x.firstName} {x.lastName}
        </div>
      ))}
    </div>
  );
};
