import { Context } from "../../../context";
import { Post } from "../../../generated/graphql";

const posts = async (
  _parent: unknown,
  _args: unknown,
  context: Context
): Promise<Post[]> => {
  const MAX_POST = 50;

  const posts = await context.prisma.post.findMany({
    include: {
      author: true,
    },
    take: MAX_POST,
    orderBy: {
      updatedAt: "asc",
    },
  });

  return posts;
};

export default posts;
