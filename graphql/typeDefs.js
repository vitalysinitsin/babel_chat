const typeDefs = `#graphql
  type User {
    username: String!
    email: String!
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
  }
`;

export default typeDefs;
