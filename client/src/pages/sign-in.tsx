import { Box, createStyles, Text } from "@mantine/core";
import React from "react";
import { SignInForm } from "../components/Forms";
import { SignInInputType } from "../types";
import {
  MeDocument,
  MeQuery,
  useSignInMutation,
} from "../graphql/generated/graphql";
import { useRouter } from "next/router";
import { ROUTES } from "../constants";
import { useForm } from "@mantine/hooks";

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
  const router = useRouter();

  const form = useForm<SignInInputType>({
    initialValues: {
      username: "",
      password: "",
    },

    validationRules: {
      username: (val) => val.length >= 1,
      password: (val) => val.length >= 1,
    },
    errorMessages: {
      username: <Text>Invalid username</Text>,
      password: <Text>Invalid password</Text>,
    },
  });

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: () => {
      router.push(ROUTES.ROOT);
    },
    onError: (error) => {
      form.setErrors(() => ({
        username: <Text>{error.message}</Text>,
        password: true,
      }));
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
      <SignInForm form={form} handleSubmit={handleSubmit} loading={loading} />
    </Box>
  );
};

export default SignIn;
