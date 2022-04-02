import { Box, createStyles } from "@mantine/core";
import React from "react";
import AuthenticationForm from "../components/SignInForm";

interface SignInProps {}

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const SignIn = ({}: SignInProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <AuthenticationForm />
    </Box>
  );
};

export default SignIn;
