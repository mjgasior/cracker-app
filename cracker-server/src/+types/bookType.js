import { gql } from "apollo-server";

export const Book = gql`
  type Book {
    title: String
    author: String
  }

  extend type Query {
    books: [Book]
  }

  extend type Mutation {
    addBook(title: String!, author: String!): Book!
  }
`;
