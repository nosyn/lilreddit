import { Box, Text, Title } from "@mantine/core";
import React from "react";
import { PostQuery } from "../../graphql/generated/graphql";

interface PostProps {
  data: PostQuery;
}

const Post = ({ data }: PostProps) => {
  return (
    <Box>
      <Title order={3} mt="xs">
        <Text color="blue" inherit component="span">
          {data.post?.title}
        </Text>
      </Title>
      <Title order={6}>
        <Text color="gray" inherit component="span">
          By {data.post?.author.username}
        </Text>
      </Title>
      <Text inherit component="p">
        {data.post?.content}
      </Text>
    </Box>
  );
};

export default Post;
