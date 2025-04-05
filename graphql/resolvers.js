import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import env from "../config/env.json" with {type: "json"};
import { Op } from "sequelize";


const resolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        let user;
        if (context?.token && context?.token !== "") {
          const token = context.token.split("Bearer ")[1];
          
          jwt.verify(token, env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
              throw new GraphQLError("Invalid token.");
            }
            user = decodedToken;
          });
        } else {
          throw new GraphQLError("Invalid token.");
        }

        const users = await db.User.findAll({
          where: { username: { [Op.ne]: user.username } },
        });

        return users;
      } catch (errors) {
        throw new GraphQLError("Failed to fetch users.", {
          extensions: { code: 401, errors },
        });
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      const errors = {};

      try {
        if (username?.trim() === "" || password === "") {
          errors.username = "Login details are missing.";
          throw errors;
        }

        const user = await db.User.findOne({ where: { username } });

        if (!user) {
          errors.username = new GraphQLError("User not found.", {
            extensions: { code: 401 },
          });

          throw errors;
        }

        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
          errors.password = new GraphQLError("Invalid credentials.", {
            extensions: { code: 401 },
          });
        }

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const token = jwt.sign({ username }, env.JWT_SECRET, {
          expiresIn: "1hr",
        });

        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (errors) {
        throw new GraphQLError("Authorization failed.", {
          extensions: { code: 401, errors },
        });
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPassword } = args;
      const errors = {};

      try {
        // validate inputs
        if (email?.trim() === "") errors.email = "Email is empty.";
        if (username?.trim() === "") errors.username = "Username is empty.";
        if (password?.trim() === "") errors.password = "Password is empty.";
        if (confirmPassword?.trim() === "")
          errors.confirmPassword = "Confrim Password is empty.";
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
      } catch (errors) {
        throw new GraphQLError("Bad input.", {
          extensions: { code: 406, errors },
        });
      }
    },
  },
};

export default resolvers;
