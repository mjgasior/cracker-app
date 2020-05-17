import { AuthenticationError } from "apollo-server";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
  {
    title: "Rzeczy, których nie wyrzuciłem",
    author: "Marcin Wicha",
  },
  {
    title: "Violence",
    author: "Slavoj Žižek",
  },
];

export const BookResolver = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: async (_, { title, author }, { user }) => {
      try {
        const { isLogged } = await user;

        if (!isLogged) {
          throw new AuthenticationError("User not logged in!");
        }

        const newBook = {
          title,
          author,
        };

        books.push(newBook);
        return newBook;
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
  },
};
