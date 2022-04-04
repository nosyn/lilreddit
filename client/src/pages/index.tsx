import { Container, createStyles, Stack } from "@mantine/core";
import Post from "../components/Post";
import { usePostsQuery } from "../graphql/generated/graphql";

const HomePage = () => {
  const { data, loading, error } = usePostsQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Container>
      {data?.posts ? (
        <Stack spacing="sm">
          {data.posts.map((post) =>
            !post ? null : (
              <Post
                author={post.author}
                title={post.title}
                createdAt={post.createdAt}
                description={post.content?.slice(0, 100)}
              />
            )
          )}
        </Stack>
      ) : (
        <div>Null</div>
      )}
    </Container>
  );
};

export default HomePage;
