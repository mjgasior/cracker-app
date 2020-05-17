import { gql } from "apollo-server";

export const User = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    addUser(firstName: String!, lastName: String!): User!
  }
`;
