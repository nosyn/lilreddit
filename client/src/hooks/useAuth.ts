import { useEffect, useState } from "react";
import { useMeQuery, User } from "../graphql/generated/graphql";

const useAuth = () => {
  const { data } = useMeQuery();
  const [me, setMe] = useState<null | User>(null);

  useEffect(() => {
    if (data?.me) {
      setMe(data.me);
    }
  }, [data]);

  const isLoggedIn = me && typeof me === "object";

  return { isLoggedIn, me };
};

export default useAuth;
