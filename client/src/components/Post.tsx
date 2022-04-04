import React from "react";
import { createStyles, Card, Image, Avatar, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderWidth: 2,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface PostProps {
  description: string | undefined;
  title: string;
  createdAt: string;
  author: {
    username: string;
    avatar?: string;
  };
}

const Post = ({ description, title, createdAt, author }: PostProps) => {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        {/* <Image src={image} height={140} width={140} /> */}
        <div className={classes.body}>
          <Text className={classes.title}>{title}</Text>
          <Text mt="xs" mb="sm">
            {description}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} src={author?.avatar} />
              <Text size="xs">{author.username}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {new Date(createdAt).toDateString()}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};

export default Post;
