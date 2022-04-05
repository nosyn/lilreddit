import React from "react";
import { Box, Container, Text } from "@mantine/core";
import Link from "next/link";
import { useGetPostFromUrl } from "../../hooks/useGetPostFromUrl";
import { Post } from "../../components/Post";

interface PostProps {}

const PostPage = ({}: PostProps) => {
  const { data, loading, error } = useGetPostFromUrl();

  return (
    <Container px="lg">
      <Link href={"/"} passHref>
        <Text component="a" variant="link" color="gray">
          ← Go back to previous page
        </Text>
      </Link>
      {loading && <Box>Loading...</Box>}
      {error && <Box>Error: {error.message}</Box>}
      {!data && <Box>Error: Couldn&apost find post</Box>}
      {data && <Post data={data} />}
    </Container>
  );
};

export default PostPage;
