import { Button, Container, Stack } from "@mantine/core";
import { PostCard } from "../components/Post";
import { usePostsQuery } from "../graphql/generated/graphql";

const HomePage = () => {
  const LIMIT = 25;
  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: {
      input: {
        cursor: null,
        limit: LIMIT,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleOnClick = () => {
    fetchMore({
      variables: {
        input: {
          limit: LIMIT,
          cursor: data?.posts[data.posts.length - 1]?.id,
        },
      },
    });
  };

  if (error) return <div>Error</div>;

  return (
    <Container>
      {data?.posts ? (
        <Stack spacing="sm">
          {data.posts.map((post) =>
            !post ? null : (
              <PostCard
                id={post.id}
                author={post.author}
                title={post.title}
                createdAt={post.createdAt}
                description={post.content?.slice(0, 100)}
                key={post.id}
              />
            )
          )}
          <Button onClick={handleOnClick} loading={loading}>
            Load More
          </Button>
        </Stack>
      ) : (
        <div>Null</div>
      )}
    </Container>
  );
};

export default HomePage;
