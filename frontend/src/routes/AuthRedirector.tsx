import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthRedirector = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading]);

  return null;
};
