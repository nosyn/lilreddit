import React, { useState } from "react";
import RichTextEditor from "@components/RichTextEditor";

import { Button, Container, TextInput, Box, createStyles } from "@mantine/core";
import { IMAGEBB_API_KEY, NAVBAR_HEIGHT } from "../configs";
import { useCreatePostMutation } from "graphql/generated/graphql";
import { useRouter } from "next/router";
import ROUTES from "@constants/Routes";

interface CreatePostPageProps {}

const useStyles = createStyles((theme) => ({
  toolbar: {
    padding: theme.spacing.xs,
  },
  actionBox: {
    display: "flex",
    gap: 5,
    justifyContent: "flex-end",
  },
  richTextEditor: {
    minHeight: 200,
  },
}));

const CreatePostPage = ({}: CreatePostPageProps) => {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const { classes } = useStyles();
  const router = useRouter();
  const [createPost] = useCreatePostMutation({
    onCompleted: (data) => {
      router.push(`${ROUTES.POST}/${data.createPost.id}`);
      console.log("data: ", data);
    },
  });

  const handleCreatePost = () => {
    createPost({
      variables: {
        input: {
          content,
          title,
        },
      },
      update: (cache) => {
        cache.evict({
          fieldName: "posts:{}",
        });
      },
    });
  };

  const handleOnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  // Example with imgbb.com, usually you would use similar logic to upload to S3 like storages
  // Function must return a promise that resolves with uploaded image url
  // After promise is resolved blurred image placeholder with be replaced with uploaded
  const handleImageUpload = (file: File): Promise<string> | void => {
    if (!IMAGEBB_API_KEY) {
      console.error("You should provide IMAGEBB_API_KEY for image bb");
      return;
    }

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch(`https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("url: ", result.data.url);
          console.log("result: ", result);
          resolve(result.data.url);
        })
        .catch(() => reject(new Error("Upload failed")));
    });
  };

  return (
    <Container mt="md">
      <TextInput
        placeholder="Title"
        value={title}
        onChange={handleOnTitleChange}
        required
        label="title-input"
        aria-label="title-input"
        error={title.length <= 0 && "Post title can't be empty"}
      />
      <RichTextEditor
        className={classes.richTextEditor}
        classNames={{
          toolbar: classes.toolbar,
        }}
        placeholder="Text (optional)"
        value={content}
        onChange={setContent}
        onImageUpload={handleImageUpload}
        stickyOffset={NAVBAR_HEIGHT}
        my="xs"
      />
      <Box className={classes.actionBox}>
        <Button variant="outline" radius="lg" color="gray">
          Save Draft
        </Button>
        <Button
          variant="filled"
          color="gray"
          radius="lg"
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePostPage;
