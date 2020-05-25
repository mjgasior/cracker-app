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

export const useUser = () => useQuery(USERS);
