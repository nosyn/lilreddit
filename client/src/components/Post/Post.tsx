import {
  Box,
  Text,
  Title,
  ActionIcon,
  createStyles,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import {
  PostQuery,
  useUpdatePostMutation,
} from "../../graphql/generated/graphql";
import { Edit, DeviceFloppy, X } from "tabler-icons-react";
import useAuth from "../../hooks/useAuth";
import RichTextEditor from "@components/RichTextEditor";
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
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
  textArea: {
    fontSize: "16px",
    lineHeight: 1.3,
  },
}));

const Post = ({ data }: PostProps) => {
  // Hooks
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
  const { me } = useAuth();

  // Event handlers
  const handleOnToggleEditMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const handleOnClickSaveIcon = () => {
    setIsEditMode(false);
    if (!data.post?.id) {
      return;
    }

    const input = {
      id: +data.post.id,
      title,
      content,
    };

    updatePost({
      variables: {
        input,
      },
    });
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const renderEditMode = () =>
    isEditMode ? (
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
    ) : (
      <>
        <Title order={3}>
          <Text color="blue" inherit component="span">
            {data.post?.title}
          </Text>
        </Title>
        <ActionIcon onClick={handleOnToggleEditMode}>
          <Edit size={36} />
        </ActionIcon>
      </>
    );

  return (
    <Box>
      <Box className={classes.titleContainer} mt="xs">
        {me?.id === data.post?.authorId ? (
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
      <RichTextEditor
        placeholder="Text (optional)"
        value={content}
        onChange={setContent}
        my="xs"
        readOnly={!isEditMode}
      />
    </Box>
  );
};

export default Post;
