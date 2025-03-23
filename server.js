import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./models/index.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ctx,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    token: req.headers.authorization || "",
  }),
});

try {
  await db.sequelize.authenticate();
  console.log("db is connected!");
  console.log(`🚀 Server ready at ${url}`);
} catch (err) {
  console.log("db is messed up! Here's the error: ", err);
}
