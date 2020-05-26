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
      {data.users.map((x, i) => (
        <div key={x.firstName + i}>
          {x.firstName} {x.lastName}
        </div>
      ))}
    </div>
  );
};
