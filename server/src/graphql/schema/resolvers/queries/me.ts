import { User } from "../../../generated/graphql";
import { Context } from "../../../context";
import { AuthenticationError } from "apollo-server-express";

const me = (
  _parent: unknown,
  _args: unknown,
  { req, prisma }: Context
): Promise<User> => {
  const userId = req.session.userId;
  if (!userId) throw new AuthenticationError("Not authenticated");

  return prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      rejectOnNotFound: true,
    })
    .catch(() => {
      console.error("Invalid user is found on redis session");
      throw new AuthenticationError("Not authenticated");
    });
};

export default me;
