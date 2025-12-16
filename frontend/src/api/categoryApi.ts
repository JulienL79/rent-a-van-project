import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllCategories = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/categories");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des catégories");
  }
};

export const fetchCategoryById = async (categoryId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/categories/${categoryId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération de la catégorie");
  }
};

export const createCategory = async (categoryData: any) => {
  try {
    return await api.post<any>("/categories", categoryData);
  } catch (err) {
    handleError(err, "Erreur lors de la création de la catégorie");
  }
};

export const updateCategory = async (categoryId: string, categoryData: any) => {
  try {
    return await api.put<any>(`/categories/${categoryId}`, categoryData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification de la catégorie");
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    return await api.delete<any>(`/categories/${categoryId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression de la catégorie");
  }
};
