import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import Link from "next/link";
import { SignInInputType } from "../../types";

interface SignInFormProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (input: SignInInputType) => void;
  form: UseForm<SignInInputType>;
  loading: boolean | undefined;
}

const SignInForm = ({ form, handleSubmit, loading }: SignInFormProps) => {
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
        <Link href="/sign-up" passHref>
          <Anchor<"a"> size="sm">Create account</Anchor>
        </Link>
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={10} radius="md">
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
            mt="xs"
          />
          <Group position="apart" mt="xs">
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="sm" loading={loading}>
            Sign In
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default SignInForm;
