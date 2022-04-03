import { Box, createStyles } from "@mantine/core";
import React from "react";
import { SignUpForm } from "../components/Forms";
import { SignInInputType } from "../types";
import {
  MeDocument,
  MeQuery,
  useSignInMutation,
} from "../graphql/generated/graphql";
import { useRouter } from "next/router";
import { ROUTES } from "../constants";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const SignUp = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [signIn, { loading }] = useSignInMutation({
    onCompleted: () => {
      router.push(ROUTES.ROOT);
    },
    onError: (error) => {
      console.log("error:", error.message);
    },
    update: (cache, { data }) => {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data?.signIn,
        },
      });
      // cache.evict({ fieldName: "posts" });
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
      <SignUpForm handleSubmit={handleSubmit} loading={loading} />
    </Box>
  );
};

export default SignUp;
