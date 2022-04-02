import {
  Menu,
  Divider,
  Text,
  createStyles,
  useMantineColorScheme,
  Switch,
  Box,
} from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { upperFirst } from "@mantine/hooks";
import { Sun, MoonStars } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  itemHovered: {
    backgroundColor: theme.colors[theme.primaryColor][7],
    color: theme.white,
  },
  item: {
    padding: 8,
  },
}));

const UserMenu = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const { classes } = useStyles();

  return (
    <Menu classNames={classes}>
      <Menu.Label>View Options</Menu.Label>
      <Menu.Item
        icon={<MoonStars size={18} />}
        rightSection={<Switch checked={isDarkTheme} />}
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
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<ArrowsLeftRight size={14} />}>
        Transfer my data
      </Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete my account
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
