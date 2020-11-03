import { gql } from "apollo-server-express";

export const Version = gql`
  extend type Query {
    getVersion: String
  }
`;
