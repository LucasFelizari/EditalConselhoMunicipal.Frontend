import { useCallback, useState } from "react";
import { createContext, useContext } from "react";

export const UserContext = createContext([]);

export function UserProvider({children}) {
  const [user, setUser] = useState();

  const dispatchUser = useCallback((usuario) => {
    setUser(usuario)
  }, [])

  return(
    <UserContext.Provider value={{
      user,
      dispatchUser
    }}>
      {children}
    </UserContext.Provider>
  );
}