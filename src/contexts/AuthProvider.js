import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [auth, setAuth] = useState({});

  const login = (auth_info) => {
    setIsLoggedin(true);
    setAuth(auth_info);
  };

  const logout = () => {
    setIsLoggedin(false);
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, auth, setAuth, isLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
