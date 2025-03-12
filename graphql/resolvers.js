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

  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPasword } = args;

      try {
        // validate inputs
        // check if data already exists in the db

        // create users
        const user = await db.User.create({ username, email, password });

        // return user back to client
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default resolvers;
