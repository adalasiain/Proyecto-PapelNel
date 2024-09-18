import { createContext, useContext, useEffect, useState } from "react";
import Users from "../Services/UsersServices";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthAuth deberia estar dentro de authProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [authErrors, setAuthErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authErrors) {
      const timer = setTimeout(() => {
        setAuthErrors(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authErrors]);

  useEffect(() => {
    async function getUser() {
      const User = new Users();
      const cookie = Cookies.get("token");
     

      if (!cookie) {
        setIsAuth(false);
        setIsLoading(false);
         setUser({}); 
         return
      }

      try {
        const user = await User.Profile();

        if ("error" in user) {
          setIsAuth(false);
          setUser({});
          setIsLoading(false);
          return
        } else {
          setUser(user);
          setIsAuth(true);
          setIsLoading(false);
          return
          
        }
      } catch (error) {
        setUser({});
        setIsAuth(true);
        setIsLoading(false);
      }
    }
    if (isLoading) {
      getUser();
    }
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, authErrors, setAuthErrors, isAuth, setIsAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
