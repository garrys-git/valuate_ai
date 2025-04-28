import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuthFetch() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = auth || {};

  return async (url, options = {}) => {
    if (!token) {
      console.warn("No auth token. Redirecting to login...");
      logout();
      navigate("/login");
      throw new Error("Unauthorized");
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 403) {
      console.warn("Token expired or invalid. Logging out...");
      logout();
      navigate("/login");
      throw new Error("Unauthorized");
    }

    return res;
  };
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isPremium: false });
  const [authLoading, setAuthLoading] = useState(true);
  const logoutCalled = useRef(false);

  const safeLogout = () => {
    if (!logoutCalled.current) {
      logoutCalled.current = true;
      console.log("Logging out.");
      localStorage.removeItem("token");
      localStorage.removeItem("isPremium");
      setAuth({ token: null, isPremium: false });
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      console.log("Fetching user info.")
      const res = await fetch("http://localhost:8000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!res.ok) {
        if (res.status === 403) {
          console.warn("Unauthorized or expired token, logging out...");
          alert("Session expired. Please login again.");
          safeLogout();
          return;
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      const isPremium = data.is_premium === true;
      localStorage.setItem("isPremium", isPremium);
      setAuth({ token, isPremium });
    } catch (err) {
      console.error("Failed to fetch user info", err);
      alert("Something went wrong. If logged out, please login again.");
      safeLogout();
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
    console.log("Logging in.")
    localStorage.setItem("token", token);
    if (skipFetch) {
      const isPremium = true;
      localStorage.setItem("isPremium", isPremium);
      setAuth({ token, isPremium });
    } else {
      await fetchUserInfo(token);
    }
  };

  // const logout = () => {
  //   console.log("Logging out.")
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("isPremium");
  //   setAuth({ token: null, isPremium: false });
  // };

  return (
    <AuthContext.Provider value={{ auth, login, logout: safeLogout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);