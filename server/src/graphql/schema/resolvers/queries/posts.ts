import { Post } from "@prisma/client";
import { Context } from "../../../context";

const posts = async (
  _parent: unknown,
  _args: unknown,
  context: Context
): Promise<Post[]> => {
  const posts = await context.prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return posts;
};

export default posts;
