import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import type {
  TAdminEquipmentData,
  TAdminEquipmentRow,
} from "../../../../types/Equipment";
import {
  deleteEquipment,
  fetchAllEquipments,
} from "../../../../api/equipmentApi";
import { Equipment } from "../../../organisms/Equipment";

export const AdminEquipment = () => {
  const [datas, setDatas] = useState<TAdminEquipmentData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminEquipmentRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedEquipmentCount, setDeletedEquipmentCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "name", "icon"];

  const selectEquipment = (id: string) => {
    navigate(id);
  };

  const deleteEquipmentById = async (id: string) => {
    try {
      await deleteEquipment(id);
      setDeletedEquipmentCount((prev) => prev + 1);
      handleSuccess("Equipement supprimé avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression de l'équipement",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const equipmentResponses = await fetchAllEquipments();

      if (equipmentResponses && equipmentResponses.data) {
        const parsedData: TAdminEquipmentData[] = equipmentResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminEquipmentRow[] = parsedData.map(
          ({ id, name, icon }) => ({
            id,
            name,
            icon,
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
  }, [id, deletedEquipmentCount]);

  if (id) {
    return <Equipment page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "equipments",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectEquipment}
      onDelete={deleteEquipmentById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
