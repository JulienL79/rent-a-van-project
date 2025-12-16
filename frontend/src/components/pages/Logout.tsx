import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils/feedbackHandler";

export function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate("/login", { replace: true });
        handleSuccess("Déconnexion réussie.");
      } catch (error) {
        navigate("/", { replace: true });
        handleError(
          error,
          "Erreur lors de la déconnexion. Veuillez réessayer.",
        );
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
}
