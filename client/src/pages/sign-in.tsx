import { Container, createStyles } from "@mantine/core";
import React from "react";
import AuthenticationForm from "../components/SignInForm";

interface SignInProps {}

const useStyles = createStyles(() => ({
  container: {
    alignSelf: "center",
  },
}));

const SignIn = ({}: SignInProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <AuthenticationForm />
    </Container>
  );
};

export default SignIn;
