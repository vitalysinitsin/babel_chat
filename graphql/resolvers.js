const resolvers = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: "John",
          email: "john@email.com",
        },
        {
          username: "Steve",
          email: "Steve@email.com",
        },
      ];

      return users;
    },
  },
};

export default resolvers;
