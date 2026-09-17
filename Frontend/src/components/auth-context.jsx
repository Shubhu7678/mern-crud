import { useState } from "react";
import { getCurrentUser, signIn, signUp } from "@/lib/api";
import { AuthContext } from "@/lib/auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const saveSession = (session) => {
    localStorage.setItem("auth-token", session.token);
    localStorage.setItem("auth-user", JSON.stringify(session.user));
    setUser(session.user);
  };

  const register = async (details) => {
    const session = await signUp(details);
    saveSession(session);
  };

  const login = async (details) => {
    const session = await signIn(details);
    saveSession(session);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setUser(null);
  };

  const refreshUser = async () => {
    const response = await getCurrentUser();
    setUser(response.user);
    localStorage.setItem("auth-user", JSON.stringify(response.user));
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
