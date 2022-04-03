import React from "react";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { SignInInputType } from "../../types";
import { useForm } from "@mantine/hooks";

interface SignInFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (input: SignInInputType) => void;
  loading: boolean | undefined;
}

const SignUpForm = ({ handleSubmit, loading }: SignInFormProps) => {
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

  return (
    <Container>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox
              id="remember-me-checkbox"
              aria-label="remember-me-checkbox"
              label="Remember me"
            />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default SignUpForm;
