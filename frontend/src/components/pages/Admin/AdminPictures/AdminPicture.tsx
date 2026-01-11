import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import type {
  TAdminPictureData,
  TAdminPictureRow,
} from "../../../../types/Picture";
import { deletePicture, fetchAllPictures } from "../../../../api/pictureApi";
import { Picture } from "../../../organisms/Picture";

export const AdminPicture = () => {
  const [datas, setDatas] = useState<TAdminPictureData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminPictureRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedPictureCount, setDeletedPictureCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "src", "userId"];

  const selectPicture = (id: string) => {
    navigate(id);
  };

  const deletePictureById = async (id: string) => {
    try {
      await deletePicture(id);
      setDeletedPictureCount((prev) => prev + 1);
      handleSuccess("Image supprimée avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression de l'image",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const pictureResponses = await fetchAllPictures();

      if (pictureResponses && pictureResponses.data) {
        const parsedData: TAdminPictureData[] = pictureResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminPictureRow[] = parsedData.map(
          ({ id, src, userId }) => ({
            id,
            src,
            userId,
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
    }
  }, [id, deletedPictureCount]);

  if (id) {
    return <Picture page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "pictures",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectPicture}
      onDelete={deletePictureById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
