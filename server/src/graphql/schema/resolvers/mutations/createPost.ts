import { AuthenticationError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationCreatePostArgs, Post } from "../../../generated/graphql";

const createPost = async (
  _parent: unknown,
  { input: { content, title } }: MutationCreatePostArgs,
  { prisma, req }: Context
): Promise<Post> => {
  const userId = req.session.userId;
  if (!userId) throw new AuthenticationError("Not authenticated");

  const post = await prisma.post.create({
    data: {
      content,
      title,
      authorId: userId,
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

  return post;
};

export default createPost;
