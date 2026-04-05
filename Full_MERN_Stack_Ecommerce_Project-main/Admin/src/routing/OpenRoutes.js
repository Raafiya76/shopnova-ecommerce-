import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return getTokenFromLocalStorage?.token &&
    getTokenFromLocalStorage?.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace={true} />
  ) : (
    children
  );
};
