import { Box, createStyles, Text } from "@mantine/core";
import React from "react";
import { SignUpForm } from "../components/Forms";
import { SignUpInputType } from "../types";
import {
  MeDocument,
  MeQuery,
  useSignUpMutation,
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

const SignUpPage = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const form = useForm<SignUpInputType>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      username: (val) => val.length >= 2,
      password: (val) => val.length >= 2,
      confirmPassword: (val, values) => val === values?.password,
    },
    errorMessages: {
      email: <Text>Invalid email</Text>,
      username: <Text>Invalid username</Text>,
      password: <Text>Invalid password</Text>,
      confirmPassword: <Text>Has to match with your password</Text>,
    },
  });

  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: () => {
      router.push(ROUTES.ROOT);
    },
    onError: (error) => {
      form.setErrors(() => ({
        email: <Text>{error.message}</Text>,
        username: true,
        confirmPassword: true,
        password: true,
      }));
    },
    update: (cache, { data }) => {
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data?.signUp,
        },
      });
      // cache.evict({ fieldName: "posts" });
    },
  });

  // Use values type in handleSubmit function or anywhere else
  const handleSubmit = ({ email, username, password }: SignUpInputType) => {
    signUp({
      variables: {
        input: {
          email,
          username,
          password,
        },
      },
    });
  };

  return (
    <Box className={classes.container}>
      <SignUpForm form={form} handleSubmit={handleSubmit} loading={loading} />
    </Box>
  );
};

export default SignUpPage;
