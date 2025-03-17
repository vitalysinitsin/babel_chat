import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";

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
      const { username, email, password, confirmPassword } = args;
      const errors = [];

      try {
        // validate inputs
        if (email?.trim() === "") errors.email = "Email is empty.";
        if (username?.trim() === "") errors.username = "Username is empty.";
        if (password?.trim() === "") errors.password = "Password is empty.";
        if (confirmPassword?.trim() === "")
          errors.confirmPassword = "Password is empty.";

        // check if data already exists in the db
        const userByUsername = await db.User.findOne({ where: { username } });
        const userByEmail = await db.User.findOne({ where: { email } });

        if (password !== confirmPassword)
          errors.confirmPassword = "Passwords do not match.";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const hashedPassword = await bcrypt.hash(password, 6);

        const user = await db.User.create({
          username,
          email,
          password: hashedPassword,
        });

        // return user back to client
        return user;
      } catch ({ errors }) {
        throw new GraphQLError("Bad input.", {
          extensions: { errors, code: 406 },
        });
      }
    },
  },
};

export default resolvers;
