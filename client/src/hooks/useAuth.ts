import { useContext } from "react";
import { AppContext } from "../context/AppContext";

type UseAuthType = {
  isLoggedIn: boolean;
};

const useAuth = (): UseAuthType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Not inside the Provider");

  console.log("context: ", context);

  return {
    isLoggedIn: true,
  };
};

export default useAuth;
