import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

export const Books = () => {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      {data.books.map((x) => (
        <div key={x.title}>
          {x.title} {x.author}
        </div>
      ))}
    </div>
  );
};
