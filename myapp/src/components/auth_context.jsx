import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthFetch = () => {
  const { token } = useAuth();
  return async (url, options = {}) => {
    return await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        return { token: token || null };
    });      

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);