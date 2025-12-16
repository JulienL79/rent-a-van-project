import { checkAuth, loginAPI, logoutAPI } from "../api/userApi";
import { create } from "zustand";

interface IDataUser {
  id: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

interface IDataState {
  isAuthenticated: boolean;
  user: IDataUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<IDataState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  // Connexion
  login: async (email, password) => {
    try {
      set({ isLoading: true });
      await loginAPI(email, password);
      const user = await checkAuth();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  // Déconnexion
  logout: async () => {
    try {
      set({ isLoading: true });
      await logoutAPI();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      throw error;
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  // Vérifier la connexion
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await checkAuth();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
