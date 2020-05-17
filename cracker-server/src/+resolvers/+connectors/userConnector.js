import { User } from "./+models/user";

export const userConnector = {
  add: async (newUser) => {
    try {
      const response = await User.create(newUser);
      return response;
    } catch (e) {
      return e.message;
    }
  },
  getAll: async () => await User.find({}).exec(),
};
