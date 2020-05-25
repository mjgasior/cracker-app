import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!) {
    addUser(firstName: $firstName, lastName: $lastName) {
      firstName
      lastName
    }
  }
`;

export const useAddUser = () => {
  return useMutation(ADD_USER);
};
