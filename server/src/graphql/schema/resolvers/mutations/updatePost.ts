import { AuthenticationError, ValidationError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationUpdatePostArgs, Post } from "../../../generated/graphql";

const updatePost = async (
  _parent: unknown,
  { input: { content, title, id } }: MutationUpdatePostArgs,
  { prisma, req }: Context
): Promise<Post> => {
  const userId = req.session.userId;
  if (!userId) throw new AuthenticationError("Not authenticated");

  const post = await prisma.post.findFirst({
    where: {
      AND: [{ authorId: userId }, { id }],
    },
  });

  if (!post) {
    throw new ValidationError(
      "Couldn't find post or you're not authorized to update this post"
    );
  }

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
      title,
    },
    select: {
      id: true,
      author: {
        select: {
          email: true,
          username: true,
          id: true,
        },
      },
      authorId: true,
      content: true,
      createdAt: true,
      title: true,
      updatedAt: true,
    },
  });

  return updatedPost;
};

export default updatePost;
