import { Resolvers } from "../../generated/graphql";

// Scalar types
import dateScalar from "../scalars/dateScalar";

// Queries
import me from "./queries/me";
import posts from "./queries/posts";

// Mutations
import signIn from "./mutations/signIn";
import signUp from "./mutations/signUp";
import signOut from "./mutations/signOut";
import createPost from "./mutations/createPost";
import deletePost from "./mutations/deletePost";
import updatePost from "./mutations/updatePost";

const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    me,
    posts,
  },
  Mutation: {
    signIn,
    signUp,
    signOut,
    createPost,
    deletePost,
    updatePost,
  },
};

export default resolvers;
