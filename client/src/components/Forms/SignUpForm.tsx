import React from "react";

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  createStyles,
} from "@mantine/core";
import { SignUpInputType } from "../../types";
import Link from "next/link";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";

const useStyle = createStyles(() => ({
  paper: {
    minWidth: 400,
  },
}));

interface SignInFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (input: SignUpInputType) => void;
  form: UseForm<SignUpInputType>;
  loading: boolean | undefined;
}

const SignUpForm = ({ form, handleSubmit, loading }: SignInFormProps) => {
  const { classes } = useStyle();

  return (
    <Container mt="100px">
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link href="/sign-in" passHref>
          <Anchor<"a"> size="sm">Sign In</Anchor>
        </Link>
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper
          className={classes.paper}
          withBorder
          shadow="md"
          p={30}
          mt={10}
          radius="md"
        >
          <TextInput
            id="email-input"
            aria-label="email-input"
            label="Email"
            placeholder="Your email"
            type="email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            required
          />
          <TextInput
            id="username-input"
            aria-label="username-input"
            label="Username"
            placeholder="Your username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username}
            required
            mt="xs"
          />
          <PasswordInput
            id="password-input"
            aria-label="password-input"
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            required
            mt="xs"
          />
          <PasswordInput
            id="confirm-password-input"
            aria-label="confirm-password-input"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={form.values.confirmPassword}
            onChange={(event) =>
              form.setFieldValue("confirmPassword", event.currentTarget.value)
            }
            error={form.errors.confirmPassword}
            required
            mt="xs"
          />

          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Sign Up
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default SignUpForm;
