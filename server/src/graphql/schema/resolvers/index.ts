// Queries
import me from "./queries/me";
import posts from "./queries/posts";

// Mutations
import signIn from "./mutations/signIn";
import signUp from "./mutations/signUp";
import signOut from "./mutations/signOut";

const resolvers = {
  Query: {
    me,
    posts,
  },
  Mutation: {
    signIn,
    signUp,
    signOut,
  },
};

export default resolvers;
