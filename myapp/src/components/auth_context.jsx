import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthFetch = () => {
  const { auth } = useAuth();
  const { token } = auth || {};
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
  const [auth, setAuth] = useState({ token: null, isPremium: false });
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.status === 403) {
        console.warn("Unauthorized or expired token, logging out...");
        alert("Session expired. Please login again.");
        logout(); // <== THIS will internally call setAuth properly
        return;
      }
  
      const data = await res.json();
      const isPremium = data.is_premium === true;
      localStorage.setItem("isPremium", isPremium);
      setAuth({ token, isPremium });
    } catch (err) {
      console.error("Failed to fetch user info", err);
      alert("Something went wrong. Please login again.");
      logout();
    }
  };  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token).finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);  

  const login = async (token, skipFetch = false) => {
    localStorage.setItem("token", token);
    if (skipFetch) {
      const isPremium = true;
      localStorage.setItem("isPremium", isPremium);
      setAuth({ token, isPremium });
    } else {
      await fetchUserInfo(token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isPremium");
    setAuth({ token: null, isPremium: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);