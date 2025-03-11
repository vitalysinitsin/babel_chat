import db from "../models/index.js";

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await db.User.findAll();

        return users;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default resolvers;
