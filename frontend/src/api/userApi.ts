import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";
import type {
  UpdateCredentialsPayload,
  UserRegisterPayload,
  UserUpdatePayload,
} from "@rent-a-van/shared/types/user.type";

export const fetchAllUsers = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/users");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des utilisateurs");
  }
};

export const fetchUserById = async (userId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(`/users/${userId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la récupération de l'utilisateur");
  }
};

export const fetchUserByIdWithDetails = async (userId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/users/details/${userId}`,
    );
  } catch (err) {
    handleError(
      err,
      "Erreur lors de la récupération de l'utilisateur avec détails",
    );
  }
};

export const createUser = async (userInformation: UserRegisterPayload) => {
  try {
    return await api.post<any>("/auth/register", userInformation);
  } catch (err: any) {
    handleError(err, "Erreur lors de la création du compte");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    return await api.delete<any>(`/users/${userId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de l'utilisateur");
  }
};

export const updateUser = async (userId: string, user: UserUpdatePayload) => {
  try {
    return await api.put<any>(`/users/${userId}`, user);
  } catch (err) {
    handleError(err, "Erreur lors de la modification de l'utilisateur");
  }
};

export const updateUserCredentials = async (
  userId: string,
  credentials: UpdateCredentialsPayload,
) => {
  try {
    return await api.put<any>(`/users/credentials/${userId}`, credentials);
  } catch (err) {
    handleError(err, "Erreur lors de la modification des identifiants");
  }
};

export const updateUserProfilePicture = async (
  userId: string,
  picture?: File,
) => {
  try {
    if (picture) {
      const formData = new FormData();
      formData.append("pictures", picture);
      return await api.put<any>(`/users/pictures/${userId}`, formData);
    } else {
      return await api.put<any>(`/users/pictures/${userId}`, null);
    }
  } catch (err) {
    handleError(err, "Erreur lors de la modification de la photo de profil");
  }
};

export const loginAPI = async (email: string, password: string) => {
  try {
    return await api.post<any>("/auth/login", { email, password });
  } catch (err: any) {
    handleError(err, "Erreur de connexion");
  }
};

export const logoutAPI = async () => {
  try {
    return await api.get<any>("/auth/logout");
  } catch (err) {
    handleError(err, "Erreur lors de la déconnexion");
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get<any>("/auth/me");
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};
