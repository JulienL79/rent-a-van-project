import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllRoles = async () => {
  try {
    return await api.get<any[]>("/roles");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des rôles");
  }
};

export const fetchRoleById = async (roleId: string) => {
  try {
    return await api.get<any>(`/roles/${roleId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la récupération du rôle");
  }
};

export const createRole = async (roleData: any) => {
  try {
    return await api.post<any>("/roles", roleData);
  } catch (err) {
    handleError(err, "Erreur lors de la création du rôle");
  }
};

export const updateRole = async (roleId: string, roleData: any) => {
  try {
    return await api.put<any>(`/roles/${roleId}`, roleData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification du rôle");
  }
};

export const deleteRole = async (roleId: string) => {
  try {
    return await api.delete<any>(`/roles/${roleId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression du rôle");
  }
};
