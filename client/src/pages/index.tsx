import { Title, Text, Anchor, Container } from "@mantine/core";
import { useMeLazyQuery, usePingQuery } from "../graphql/generated/graphql";
import useAuth from "../hooks/useIsAuth";

const HomePage = () => {
  const { data, loading, error } = usePingQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Container
      style={{
        textAlign: "center",
        border: "1px solid blue",
      }}
    >
      <div>{data!.ping}</div>
    </Container>
  );
};

export default HomePage;
