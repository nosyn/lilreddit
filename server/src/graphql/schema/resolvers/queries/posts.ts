import { UserInputError } from "apollo-server-express";
import { Context } from "../../../context";
import { Post, QueryPostsArgs } from "../../../generated/graphql";

const posts = async (
  _parent: unknown,
  { input: { cursor, limit } }: QueryPostsArgs,
  context: Context
): Promise<Post[]> => {
  if (typeof limit === "number" && limit <= 0) {
    throw new UserInputError("Limit has to be positive number.");
  }

  if (typeof cursor === "number" && cursor <= 0) {
    throw new UserInputError("Cursor has to be positive number.");
  }

  const MAX_POST = 50;
  const LIMIT = limit || MAX_POST;

  let posts: Post[];

  if (cursor) {
    posts = await context.prisma.post.findMany({
      take: LIMIT,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },
      include: {
        author: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  } else {
    posts = await context.prisma.post.findMany({
      take: LIMIT,
      include: {
        author: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  return posts;
};

export default posts;
