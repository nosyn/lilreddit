import { createContext, useState } from "react";
import { User } from "../graphql/generated/graphql";
import { AppContext } from "../types";

const AppContext = createContext<AppContext>({
  user: null,
});

// Don't know what to pass as props to the context
type AppContextProviderProps = any;

function AppContextProvider(props: AppContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return <AppContext.Provider value={[user, setUser]} {...props} />;
}

export { AppContextProvider, AppContext };
