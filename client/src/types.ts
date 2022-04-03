import { SignInInput, SignUpInput } from "./graphql/generated/graphql";

export type SignInInputType = SignInInput;
export type SignUpInputType = SignUpInput & {
  confirmPassword: string;
};
