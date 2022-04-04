import { Context } from "../../../context";
import { Post, QueryPostArgs } from "../../../generated/graphql";

const post = async (
  _parent: unknown,
  { input: { id } }: QueryPostArgs,
  context: Context
): Promise<Post | null> => {
  const post = await context.prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return post;
};

export default post;
