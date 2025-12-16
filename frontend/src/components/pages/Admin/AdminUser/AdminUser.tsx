import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import type { TAdminUserData, TAdminUserRow } from "../../../../types/User";
import { deleteUser, fetchAllUsers } from "../../../../api/userApi";
import { User } from "../../../organisms/User";

export const AdminUser = () => {
  const [datas, setDatas] = useState<TAdminUserData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminUserRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedUserCount, setDeletedUserCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "email", "roleName", "createdAt"];

  const selectUser = (id: string) => {
    navigate(id);
  };

  const deleteUserById = async (id: string) => {
    try {
      await deleteUser(id);
      setDeletedUserCount((prev) => prev + 1);
      handleSuccess("Utilisateur supprimé avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression de l'utilisateur",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const userResponses = await fetchAllUsers();

      if (userResponses && userResponses.data) {
        const parsedData: TAdminUserData[] = userResponses.data.map((item) => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt) : null,
        }));

        setDatas(parsedData);

        const simplifiedData: TAdminUserRow[] = parsedData.map(
          ({ id, email, roleName, createdAt }) => ({
            id,
            email,
            roleName,
            createdAt,
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
  }, [id, deletedUserCount]);

  if (id) {
    return <User page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "users",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectUser}
      onDelete={deleteUserById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
