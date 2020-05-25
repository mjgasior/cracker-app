import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import styled from "styled-components";
import { useAddUser } from "./+hooks/useAddUser";

const Container = styled.div`
  max-width: 500px;
`;

const { Title } = Typography;

export const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addUser, { data, error }] = useAddUser();

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
