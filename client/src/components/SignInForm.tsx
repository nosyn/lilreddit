import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from "@mantine/core";
import { BrandGoogle, BrandTwitter } from "tabler-icons-react";

const SignInForm = (props: PaperProps<"div">) => {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: true,
    },

    validationRules: {
      username: (val) => val.length >= 6,
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Lil Reddit, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <Button variant="default" leftIcon={<BrandGoogle />} radius="xl">
          Google
        </Button>
        <Button
          variant="default"
          color="gray"
          leftIcon={<BrandTwitter />}
          radius="xl"
        >
          Twitter
        </Button>
      </Group>

      <Divider
        label="Or continue with username"
        labelPosition="center"
        my="lg"
      />

      <form onSubmit={form.onSubmit(() => {})}>
        <Group direction="column" grow>
          {type === "register" && (
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />
          )}

          <TextInput
            label="Username"
            placeholder="Your username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default SignInForm;
