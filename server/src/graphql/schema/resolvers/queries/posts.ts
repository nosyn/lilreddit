import { Post } from "@prisma/client";
import { Context } from "../../../context";

const posts = (_parent: any, _args: any, context: Context): Promise<Post[]> => {
  return context.prisma.post.findMany({
    include: {
      author: true,
    },
  });
};

export default posts;
