import { Button, Container, Stack } from "@mantine/core";
import { PostCard } from "../components/Post";
import { POSTS_LIMIT } from "../constants";
import { usePostsQuery } from "../graphql/generated/graphql";

const HomePage = () => {
  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: {
      input: {
        cursor: null,
        limit: POSTS_LIMIT,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleOnClick = () => {
    fetchMore({
      variables: {
        input: {
          limit: POSTS_LIMIT,
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
                key={post.title}
              />
            )
          )}
          <Button onClick={handleOnClick} loading={loading}>
            Load Moreee
          </Button>
        </Stack>
      ) : (
        <div>Null</div>
      )}
    </Container>
  );
};

export default HomePage;
