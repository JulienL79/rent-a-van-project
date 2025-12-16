import { deleteVehicle, fetchAllVehicles } from "../../../../api/vehicleApi";
import { Vehicle } from "../../../organisms/Vehicle";
import type {
  TAdminVehicleData,
  TAdminVehicleRow,
} from "../../../../types/Vehicle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";

export const AdminVehicle = () => {
  const [datas, setDatas] = useState<TAdminVehicleData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminVehicleRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedVehicleCount, setDeletedVehicleCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "registrationPlate", "createdAt"];

  const selectVehicle = (id: string) => {
    navigate(id);
  };

  const deleteVehicleById = async (id: string) => {
    try {
      await deleteVehicle(id);
      setDeletedVehicleCount((prev) => prev + 1);
      handleSuccess("Véhicule supprimé avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression du véhicule",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const vehicleResponses = await fetchAllVehicles();

      if (vehicleResponses && vehicleResponses.data) {
        const parsedData: TAdminVehicleData[] = vehicleResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminVehicleRow[] = parsedData.map(
          ({ id, registrationPlate, createdAt }) => ({
            id,
            registrationPlate,
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
  }, [id, deletedVehicleCount]);

  if (id) {
    return <Vehicle page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "vehicles",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectVehicle}
      onDelete={deleteVehicleById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
