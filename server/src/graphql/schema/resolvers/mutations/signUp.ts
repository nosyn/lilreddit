import { UserInputError } from "apollo-server-express";
import { Context } from "../../../context";
import { MutationSignUpArgs, User } from "../../../generated/graphql";
import crypto from "crypto";

const signUp = async (
  _parent: unknown,
  { input: { email, password, username } }: MutationSignUpArgs,
  { prisma, req }: Context
): Promise<User> => {
  // Find if the email exists
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  console.log("user: ", user);

  if (user) {
    throw new UserInputError("Email or username already exists");
  }

  // Creating a unique salt for a particular user
  const salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  console.log("hashedPassword: ", hashedPassword);

  const registeredUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      salt,
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
