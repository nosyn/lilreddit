import React from "react";
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Box,
  Button,
  ActionIcon,
} from "@mantine/core";
import { Search } from "tabler-icons-react";
import { BrandReddit } from "tabler-icons-react";
import { NAVBAR_HEIGHT, NAVBAR_MARGIN_BOTTOM } from "../configs/uiConfigs";
import Link from "next/link";
import { AuthUserMenu, UserMenu } from "./Menu";
import { useMeQuery } from "../graphql/generated/graphql";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: "sticky",
  },

  inner: {
    height: NAVBAR_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("md")]: {
      maxWidth: 400,
    },
    width: "100%",
    maxWidth: 600,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const NavBar = () => {
  const { data } = useMeQuery();
  // const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  return (
    <Header
      height={NAVBAR_HEIGHT}
      className={classes.header}
      mb={NAVBAR_MARGIN_BOTTOM}
    >
      <Box className={classes.inner}>
        <Group>
          {/* <Burger opened={opened} onClick={() => toggleOpened()} size="sm" /> */}
          <Link href="/" passHref>
            <ActionIcon size="md">
              <BrandReddit />
            </ActionIcon>
          </Link>
        </Group>

        <Autocomplete
          className={classes.search}
          placeholder="Search"
          icon={<Search size={16} />}
          data={[
            "React",
            "Angular",
            "Vue",
            "Next.js",
            "Riot.js",
            "Svelte",
            "Blitz.js",
          ]}
        />

        {data?.me ? (
          <AuthUserMenu user={data.me} />
        ) : (
          <Group>
            <Group ml={50} spacing={5} className={classes.links}>
              <Link href="/sign-in" passHref>
                <Button variant="default" radius="xl">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-in" passHref>
                <Button variant="light" radius="xl">
                  Sign Up
                </Button>
              </Link>
              <UserMenu />
            </Group>
          </Group>
        )}
      </Box>
    </Header>
  );
};

export default NavBar;
