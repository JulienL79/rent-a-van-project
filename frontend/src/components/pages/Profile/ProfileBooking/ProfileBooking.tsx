import {
  Card,
  type IBookingCardPropsOwner,
  type IBookingCardPropsRenter,
} from "../../../molecules/Card";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import {
  fetchBookingsByOwner,
  fetchBookingsByRenter,
} from "../../../../api/bookingApi";

export const ProfileBooking = () => {
  const [bookingFilter, setBookingFilter] = useState<"owner" | "renter">(
    "renter",
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookingDatas, setBookingDatas] = useState<
    IBookingCardPropsOwner[] | IBookingCardPropsRenter[] | null
  >(null);
  const { user } = useAuthStore();

  // Fonction pour récupérer les réservations en tant que propriétaire
  const fetchOwnerBookings = async () => {
    if (!user) return [];
    const bookings = await fetchBookingsByOwner(user.id);
    if (!bookings) return [];
    return bookings.data.map((booking) => ({
      id: booking.id,
      vehiclePlate: booking.vehiclePlate,
      renterName: booking.renterName,
      startDate: booking.startDate,
      endDate: booking.endDate,
      amount: booking.amount,
      status: booking.status as
        | "pending"
        | "confirmed"
        | "cancelled"
        | "finished",
    }));
  };

  // Fonction pour récupérer les réservations en tant que locataire
  const fetchRenterBookings = async () => {
    if (!user) return [];
    const bookings = await fetchBookingsByRenter(user.id);
    if (!bookings) return [];
    return bookings.data.map((booking) => ({
      id: booking.id,
      ownerName: booking.ownerName,
      startDate: booking.startDate,
      endDate: booking.endDate,
      amount: booking.amount,
      status: booking.status as
        | "pending"
        | "confirmed"
        | "cancelled"
        | "finished",
    }));
  };

  // Charger les données des véhicules ou des réservations en fonction de la page
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (bookingFilter === "owner") {
        const bookingResponses = await fetchOwnerBookings();
        const bookings: IBookingCardPropsOwner[] = bookingResponses.map(
          (booking) => ({
            type: bookingFilter,
            data: booking,
          }),
        );
        setBookingDatas(bookings);
      } else {
        const bookingResponses = await fetchRenterBookings();
        const bookings: IBookingCardPropsRenter[] = bookingResponses.map(
          (booking) => ({
            type: bookingFilter,
            data: booking,
          }),
        );
        setBookingDatas(bookings);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <nav className="card-filter">
        <p>En tant que :</p>
        {(["renter", "owner"] as const).map((filter) => (
          <a
            key={filter}
            className={bookingFilter === filter ? "active" : ""}
            onClick={() => setBookingFilter(filter)}
          >
            {filter === "owner" ? "Propriétaire" : "Locataire"}
          </a>
        ))}
      </nav>

      {!isLoading && (
        <div className="card-list">
          {!bookingDatas || bookingDatas.length === 0 ? (
            <h2>Aucune réservation trouvée</h2>
          ) : bookingFilter === "owner" ? (
            <>
              {(bookingDatas as IBookingCardPropsOwner[]).map((booking) => (
                <Card key={booking.data.id} type="owner" data={booking.data} />
              ))}
            </>
          ) : (
            <>
              {(bookingDatas as IBookingCardPropsRenter[]).map((booking) => (
                <Card key={booking.data.id} type="renter" data={booking.data} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
