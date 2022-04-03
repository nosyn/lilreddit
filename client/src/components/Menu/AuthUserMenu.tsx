import { useApolloClient } from "@apollo/client";
import {
  Menu,
  Divider,
  Text,
  createStyles,
  useMantineColorScheme,
  Switch,
  Avatar,
  Button,
} from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Logout,
  ChevronDown,
} from "tabler-icons-react";
import { MoonStars } from "tabler-icons-react";
import { User, useSignOutMutation } from "../../graphql/generated/graphql";

const useStyles = createStyles((theme) => ({
  itemHovered: {
    backgroundColor: theme.colors[theme.primaryColor][7],
    color: theme.white,
  },
  item: {
    padding: 8,
  },
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
}));

type AuthUserMenuProps = {
  user: User;
};

const AuthUserMenu = ({ user }: AuthUserMenuProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const isDarkTheme = colorScheme === "dark";
  const apolloClient = useApolloClient();
  const [signOut] = useSignOutMutation({
    onCompleted: (data) => {
      if (data.signOut) {
        apolloClient.resetStore();
      }
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const controlButton = () => {
    return (
      <Button
        variant="subtle"
        leftIcon={<Avatar size={"md"} radius={10} />}
        rightIcon={<ChevronDown />}
        p={0}
      >
        <Text>{user.username}</Text>
      </Button>
    );
  };

  return (
    <Menu classNames={classes} control={controlButton()}>
      <Menu.Label>View Options</Menu.Label>
      <Menu.Item
        icon={<MoonStars size={18} />}
        rightSection={<Switch checked={isDarkTheme} onChange={() => {}} />}
        onClick={() => toggleColorScheme()}
      >
        <Text size="sm">Dark Theme</Text>
      </Menu.Item>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<Search size={14} />}
        rightSection={
          <Text size="xs" color="dimmed">
            ⌘K
          </Text>
        }
      >
        Search
      </Menu.Item>
      <Divider />

      <Menu.Item
        icon={<Logout size={14} />}
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

export default AuthUserMenu;
