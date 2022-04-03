import { Title, Text, Anchor, Container } from "@mantine/core";
import { useMeLazyQuery, usePingQuery } from "../graphql/generated/graphql";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { data, loading, error } = usePingQuery();
  const { isLoggedIn } = useAuth();

  console.log("isLoggedIn: ", isLoggedIn);

  const [me] = useMeLazyQuery({
    onCompleted: (data) => {
      console.log("data: ", data);
    },
  });
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
      <button
        onClick={() => {
          me();
        }}
      >
        Me
      </button>
    </Container>
  );
};

export default HomePage;
