import { UserInputError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationSignInArgs, User } from "../../../generated/graphql";
import { hashPassword } from "../../../../util/hashPassword";

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
      // Hash the user input password with the user.salt
      const hash = hashPassword(password, user.salt);

      // Compare the password and the hash
      const isValid = hash === user.password;

      if (!isValid) throw new UserInputError("Incorrect username or password");

      return user;
    })
    .catch(() => {
      throw new UserInputError("Incorrect username or password");
    });

  // Store user id session
  // this will set a cookie on the user
  // keep them logged in
  req.session.userId = user.id;

  return user;
};

export default signIn;
