import { User } from "@prisma/client";
import { Context } from "../../../context";

const users = (_parent: any, _args: any, context: Context): Promise<User[]> => {
  return context.prisma.user.findMany({
    include: {
      posts: true,
    },
  });
};

export default users;
