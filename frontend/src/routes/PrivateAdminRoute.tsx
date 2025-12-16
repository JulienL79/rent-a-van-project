import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const PrivateAdminRoute = () => {
  const { user } = useAuthStore();

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
