import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const USERS = gql`
  {
    users {
      firstName
      lastName
    }
  }
`;

export const Users = () => {
  const { loading, error, data } = useQuery(USERS);

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
