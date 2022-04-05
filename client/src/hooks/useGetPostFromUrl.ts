import { useRouter } from "next/router";
import { usePostQuery } from "../graphql/generated/graphql";

export const useGetPostFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return usePostQuery({
    skip: intId === -1,
    variables: {
      input: {
        id: intId,
      },
    },
  });
};
