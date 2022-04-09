import {
  Box,
  Text,
  Textarea,
  Title,
  ActionIcon,
  createStyles,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import {
  PostQuery,
  useMeQuery,
  useUpdatePostMutation,
} from "../../../graphql/generated/graphql";
import { DeviceFloppy, X } from "tabler-icons-react";
interface PostProps {
  data: PostQuery;
}

const useStyles = createStyles((theme) => ({
  titleContainer: {
    display: "flex",
    justifyItems: "center",
    gap: 5,
  },
  paper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[9]
        : theme.colors.gray[2],
  },
  textArea: {
    fontSize: "16px",
    lineHeight: 1.3,
  },
}));

export const splitIntoParagraphs = (content: string) =>
  content.split(/\n/).filter((content) => content.length > 0);

const UpdatePost = ({ data }: PostProps) => {
  // Hooks
  const [content, setContent] = useState<string>(
    data.post?.content || "No content"
  );
  const [title, setTitle] = useState<string>(data.post?.title || "No title");
  const [updatePost] = useUpdatePostMutation({
    onCompleted: (data) => {
      console.log("Complete: ", data);
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });
  const { classes } = useStyles();
  const { data: MeData } = useMeQuery();

  // Event handlers
  const handleOnToggleEditMode = () => {};

  const handleOnClickSaveIcon = () => {
    if (!data.post?.id) {
      console.log("Can't update post. Invalid post id");
      return;
    }

    const input = {
      id: +data.post.id,
      title,
      content,
    };
    console.log("input: ", input);

    updatePost({
      variables: {
        input,
      },
    });
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleOnChangeContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.currentTarget.value);
  };

  const renderEditMode = () => (
    <>
      <TextInput
        color="blue"
        value={title}
        styles={{
          input: {
            width: `${title.length * 0.5}rem`,
            minWidth: "150px",
          },
        }}
        onChange={handleOnChangeTitle}
        size="xs"
      />
      <ActionIcon onClick={handleOnClickSaveIcon}>
        <DeviceFloppy size={36} />
      </ActionIcon>
      <ActionIcon onClick={handleOnToggleEditMode}>
        <X size={36} />
      </ActionIcon>
    </>
  );

  return (
    <Box>
      <Box className={classes.titleContainer} mt="xs">
        {MeData?.me?.id === data.post?.authorId ? (
          renderEditMode()
        ) : (
          <Title order={3}>
            <Text color="blue" inherit component="span">
              {data.post?.title}
            </Text>
          </Title>
        )}
      </Box>
      <Title order={6} mb={6}>
        <Text color="gray" inherit component="span">
          By {data.post?.author.username}
        </Text>
      </Title>

      <Textarea
        classNames={{ input: classes.textArea }}
        value={content}
        onChange={handleOnChangeContent}
        placeholder="Your post goes here...."
        required
        autosize
      />
    </Box>
  );
};

export default UpdatePost;
