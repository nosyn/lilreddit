import React from "react";
import { createStyles, Card, Avatar, Text, Group } from "@mantine/core";
import Link from "next/link";
import RichTextEditor from "@components/RichTextEditor";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderWidth: 2,
    "&: hover": {
      border: "1px solid grey",
      cursor: "pointer",
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
    width: "100%",
  },
}));

interface PostProps {
  id: number;
  description: string | undefined;
  title: string;
  createdAt: string;
  author: {
    username: string;
    avatar?: string;
  };
}

const PostCard = ({ id, description, title, createdAt, author }: PostProps) => {
  const { classes } = useStyles();

  return (
    <Link href={"/post/[id]"} as={`/post/${id}`} passHref>
      <Card
        withBorder
        radius="md"
        p={0}
        className={classes.card}
        component="div"
      >
        <Group noWrap spacing={0}>
          <div className={classes.body}>
            <Text className={classes.title}>{title}</Text>
            {description && (
              <RichTextEditor
                value={description}
                onChange={() => {}}
                readOnly
                styles={() => ({
                  root: {
                    maxHeight: "100px",
                    overflow: "hidden",
                  },
                })}
                my="xs"
              />
            )}
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
    </Link>
  );
};

export default PostCard;
