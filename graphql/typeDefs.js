const typeDefs = `#graphql
  type User {
    username: String!
    email: String!
    token: String
  }

  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
  }
`;

export default typeDefs;
