import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { DataTable } from "../../../molecules/DataTable";
import type {
  TAdminBookingData,
  TAdminBookingRow,
} from "../../../../types/Booking";
import { deleteBooking, fetchAllBookings } from "../../../../api/bookingApi";
import { Booking } from "../../../organisms/Booking";

export const AdminBooking = () => {
  const [datas, setDatas] = useState<TAdminBookingData[]>([]);
  const [simplifiedDatas, setSimplifiedDatas] = useState<TAdminBookingRow[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletedBookingCount, setDeletedBookingCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const columns = ["id", "createdAt", "status", "amount"];

  const selectBooking = (id: string) => {
    navigate(id);
  };

  const deleteBookingById = async (id: string) => {
    try {
      await deleteBooking(id);
      setDeletedBookingCount((prev) => prev + 1);
      handleSuccess("Réservations supprimées avec succès !");
      return { ok: true };
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la suppression de la réservation",
      );
      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const bookingResponses = await fetchAllBookings();

      if (bookingResponses && bookingResponses.data) {
        const parsedData: TAdminBookingData[] = bookingResponses.data.map(
          (item) => ({
            ...item,
            createdAt: item.createdAt ? new Date(item.createdAt) : null,
          }),
        );

        setDatas(parsedData);

        const simplifiedData: TAdminBookingRow[] = parsedData.map(
          ({ id, createdAt, status, amount }) => ({
            id,
            createdAt,
            status,
            amount,
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
  }, [id, deletedBookingCount]);

  if (id) {
    return <Booking page="admin" id={id} onInteract={() => {}} />;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <DataTable
      pageData={{
        page: "bookings",
        datas: simplifiedDatas,
        columns,
      }}
      onSelect={selectBooking}
      onDelete={deleteBookingById}
      onUpdate={() => {
        console.log("Modif");
      }}
    />
  );
};
