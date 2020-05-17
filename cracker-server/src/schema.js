import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;
