import { userConnector } from "./+connectors/userConnector";

export const UserResolver = {
  Query: {
    users: userConnector.getAll,
  },
  Mutation: {
    addUser: async (_, newUser) => await userConnector.add(newUser),
  },
};
