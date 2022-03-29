import { UserInputError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationSignInArgs, User } from "../../../generated/graphql";
import argon2 from "argon2";

const signIn = async (
  _parent: unknown,
  { input: { password, username } }: MutationSignInArgs,
  { prisma, req }: Context
): Promise<User> => {
  // Find if the email exists
  const user = await prisma.user
    .findFirst({
      where: {
        username,
      },
      rejectOnNotFound: true,
    })
    .then(async (user) => {
      // Check for the password
      const valid = await argon2.verify(user.password, password);
      if (!valid)
        throw new UserInputError("Username or password are incorrect");

      return user;
    })
    .catch(() => {
      throw new UserInputError("Username or password are incorrect");
    });

  // Store user id session
  // this will set a cookie on the user
  // keep them logged in
  req.session.userId = user.id;

  return user;
};

export default signIn;
