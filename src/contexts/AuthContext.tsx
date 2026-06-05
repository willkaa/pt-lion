import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({ isAdmin: false, login: () => false, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("admin") === "1");

  const login = (username: string, password: string) => {
    if (username === "admin1" && password === "adminlion1") {
      setIsAdmin(true);
      sessionStorage.setItem("admin", "1");
      return true;
    }
    return false;
  };

  const logout = () => { setIsAdmin(false); sessionStorage.removeItem("admin"); };

  return <AuthContext.Provider value={{ isAdmin, login, logout }}>{children}</AuthContext.Provider>;
};
