import { Button, Container, Stack } from "@mantine/core";
import Post from "../components/Post";
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

  console.log("loading: ", loading);
  if (error) return <div>Error</div>;

  return (
    <Container>
      {data?.posts ? (
        <Stack spacing="sm">
          {data.posts.map((post, index) =>
            !post ? null : (
              <Post
                author={post.author}
                title={`${index + 1} ${post.id} ${post.title}`}
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
