// Queries
import users from "./queries/users";
import posts from "./queries/posts";

const resolvers = {
  Query: {
    users,
    posts,
  },
};

export default resolvers;
