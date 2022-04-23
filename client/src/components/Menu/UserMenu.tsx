import {
  Menu,
  Divider,
  Text,
  createStyles,
  useMantineColorScheme,
  Switch,
} from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { MoonStars } from "tabler-icons-react";

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
        rightSection={<Switch checked={isDarkTheme} onChange={() => {}} />}
        onClick={() => toggleColorScheme()}
      >
        <Text size="sm">Dark Theme</Text>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
