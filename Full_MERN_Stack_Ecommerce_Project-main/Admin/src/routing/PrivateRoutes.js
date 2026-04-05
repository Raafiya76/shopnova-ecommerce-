import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return getTokenFromLocalStorage?.token &&
    getTokenFromLocalStorage?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/admin/login" replace={true} />
  );
};
