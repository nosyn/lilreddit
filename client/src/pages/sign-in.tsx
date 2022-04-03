import { Box, createStyles } from "@mantine/core";
import React from "react";
import SignInForm from "../components/SignInForm";
import { SignInInputType } from "../types";
import { useSignInMutation } from "../graphql/generated/graphql";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const SignIn = () => {
  const { classes } = useStyles();

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: (data) => {
      console.log("data: ", data);
    },
    onError: (error) => {
      console.log("error:", error.message);
    },
  });

  // Use values type in handleSubmit function or anywhere else
  const handleSubmit = ({ username, password }: SignInInputType) => {
    signIn({
      variables: {
        input: {
          username,
          password,
        },
      },
    });
  };

  return (
    <Box className={classes.container}>
      <SignInForm handleSubmit={handleSubmit} loading={loading} />
    </Box>
  );
};

export default SignIn;
