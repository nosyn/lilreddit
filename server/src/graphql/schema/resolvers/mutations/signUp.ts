import { UserInputError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationSignUpArgs, User } from "../../../generated/graphql";
import argon2 from "argon2";

const signUp = async (
  _parent: unknown,
  { input: { email, password, username } }: MutationSignUpArgs,
  { prisma, req }: Context
): Promise<User> => {
  // Find if the email exists
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { password }],
    },
  });

  if (user) {
    throw new UserInputError("Email or username already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const registeredUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  // Store user id session
  // this will set a cookie on the user
  // keep them logged in
  req.session.userId = registeredUser.id;

  return registeredUser;
};

export default signUp;
