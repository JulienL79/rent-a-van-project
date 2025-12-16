import { Router } from "./routes/Router";
import { InitialLoader } from "./components/atoms/InitialLoader";
import { Header } from "./components/molecules/Header";
import { Footer } from "./components/molecules/Footer";
import { Alert } from "./components/atoms/Alert";
import "./style/main.scss";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { useAlertStore } from "./store/useAlertStore";

export const App = () => {
  const { type, message, clearMessage } = useAlertStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="app-container">
      <InitialLoader />
      <Header />
      {message && type && (
        <Alert type={type} message={message} onClose={() => clearMessage()} />
      )}
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
};
