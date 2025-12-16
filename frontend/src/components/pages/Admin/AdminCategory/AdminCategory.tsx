import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import type {
  TAdminCategoryData,
  TAdminCategoryRow,
} from "../../../../types/Category";
import {
  deleteCategory,
  fetchAllCategories,
} from "../../../../api/categoryApi";
import { Category } from "../../../organisms/Category";

export const AdminCategory = () => {
  const [datas, setDatas] = useState<TAdminCategoryData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminCategoryRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedCategoryCount, setDeletedCategoryCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "name"];

  const selectCategory = (id: string) => {
    navigate(id);
  };

  const deleteCategoryById = async (id: string) => {
    try {
      await deleteCategory(id);
      setDeletedCategoryCount((prev) => prev + 1);
      handleSuccess("Catégorie supprimée avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression de la catégorie",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const categoryResponses = await fetchAllCategories();

      if (categoryResponses && categoryResponses.data) {
        const parsedData: TAdminCategoryData[] = categoryResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminCategoryRow[] = parsedData.map(
          ({ id, name }) => ({
            id,
            name,
          }),
        );

        setSimplifiedDatas(simplifiedData);
      } else {
        setDatas([]);
        setSimplifiedDatas([]);
      }

      setIsLoading(false);
    };

    if (!id) {
      loadData();
      if (datas) console.log("Données récupérées");
    }
  }, [id, deletedCategoryCount]);

  if (id) {
    return <Category page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "categories",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectCategory}
      onDelete={deleteCategoryById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
