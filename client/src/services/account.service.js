import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || Cookies.get("jwt")
  );
  const navigate = useNavigate();

  const login = ({ userId, token }) => {
    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    console.log(userId, token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    if (token !== null) {
      navigate("/dashboard")
    }
    
  };

  const getUserInfo = async () => {
    const response = await fetch(`http://localhost:4000/user/${userId}`);
    const data = await response.json();
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ userId, token, login, logout, isAuthenticated, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
