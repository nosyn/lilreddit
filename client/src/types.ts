import { SignInInput, User } from "./graphql/generated/graphql";

export type SignInInputType = SignInInput;

export type AppContext = {
  user: User | null;
};
