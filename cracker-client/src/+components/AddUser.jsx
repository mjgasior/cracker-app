import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!) {
    addUser(firstName: $firstName, lastName: $lastName) {
      firstName
    }
  }
`;

export const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addUser, { data, error }] = useMutation(ADD_USER);

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h2>Add a user</h2>
      <p>
        <label>
          First name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </p>
      <p>
        <button onClick={() => addUser({ variables: { firstName, lastName } })}>
          Upload user!
        </button>
      </p>
      {data && (
        <div>
          <p>Done!</p>
          <p>For title of {data.addUser.title}</p>
          <p>and author {data.addUser.author}</p>
        </div>
      )}
    </div>
  );
};
