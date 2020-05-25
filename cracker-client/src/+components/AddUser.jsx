import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Input, Typography } from "antd";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
`;

const { Title } = Typography;

const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!) {
    addUser(firstName: $firstName, lastName: $lastName) {
      firstName
      lastName
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
    <Container>
      <Title level={3}>Add a user</Title>
      <p>
        <label>
          First name:
          <Input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Last name:
          <Input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </p>
      <p>
        <Button
          type="primary"
          onClick={() => addUser({ variables: { firstName, lastName } })}
        >
          Upload user!
        </Button>
      </p>
      {data && (
        <div>
          <p>Done!</p>
          <p>
            My first name is {data.addUser.firstName} and last name is{" "}
            {data.addUser.lastName}!
          </p>
        </div>
      )}
    </Container>
  );
};
