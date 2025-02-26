import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./models/index.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);

db.sequelize
  .authenticate()
  .then(() => {
    console.log("db is connected!");
  })
  .catch((err) => {
    console.log("db is messed up! Here's the error: ", err);
    console.log(`🚀 Server ready at ${url}`);
  });
