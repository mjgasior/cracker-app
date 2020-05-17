import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!) {
    addUser(firstName: $firstName, lastName: $lastName) {
      firstName
    }
  }
`;

export function AddBook() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [addBook, { data, error }] = useMutation(ADD_BOOK);
  const [addUser] = useMutation(ADD_USER);

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h2>Add a book</h2>
      <p>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </p>
      <p>
        <button onClick={() => addBook({ variables: { title, author } })}>
          Upload book!
        </button>
        <button
          onClick={() =>
            addUser({ variables: { firstName: title, lastName: author } })
          }
        >
          Upload user!
        </button>
      </p>
      {data && (
        <div>
          <p>Done!</p>
          <p>For title of {data.addBook.title}</p>
          <p>and author {data.addBook.author}</p>
        </div>
      )}
    </div>
  );
}
