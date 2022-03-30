import { AuthenticationError, ValidationError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationDeletePostArgs, Post } from "../../../generated/graphql";

const deletePost = async (
  _parent: unknown,
  { input: { id } }: MutationDeletePostArgs,
  { prisma, req }: Context
): Promise<boolean> => {
  const userId = req.session.userId;
  if (!userId)
    throw new AuthenticationError("Not authenticated to delete post");

  // Find the post that match with userId and id
  const post = await prisma.post.findFirst({
    where: {
      id,
      authorId: userId,
    },
  });

  if (!post) {
    throw new AuthenticationError("Not authenticated to delete post");
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });

  return true;
};

export default deletePost;
