import { PageMeta } from "../../atoms/PageMeta";
import { Aside } from "../../molecules/Aside";
import { adminMetaDatas } from "./AdminMetaData";
import { useParams } from "react-router-dom";
import type { IAdminMetaData } from "./Admin.props";
import { useEffect, useState } from "react";
import "./Admin.scss";
import { AuthRedirector } from "../../../routes/AuthRedirector";
import { AdminVehicle } from "./AdminVehicle";
import { AdminUser } from "./AdminUser";
import { AdminBooking } from "./AdminBooking";
import { AdminCategory } from "./AdminCategory";
import { AdminEquipment } from "./AdminEquipment";
import { AdminPicture } from "./AdminPictures";
import { AdminMessage } from "./AdminMessage";

export const Admin = () => {
  const { page, id } = useParams();
  const [pageMetaData, setPageMetaData] = useState<IAdminMetaData>(
    adminMetaDatas.find((meta) => meta.page === (page || "home"))!,
  );

  // Charger les métadonnées de la page en fonction du paramètre d'URL
  useEffect(() => {
    const metaData = adminMetaDatas.find((meta) => meta.page === page);

    if (metaData) {
      setPageMetaData(metaData);
    }
  }, [page]);
  return (
    <div className="page admin-page">
      <PageMeta
        title="RentAVan - Espace Administrateur"
        description="Interface d’administration de RentAVan pour gérer les utilisateurs, les réservations et les contenus de la plateforme."
      />

      <AuthRedirector />
      <Aside page="admin" active={pageMetaData.page} />

      <section className="content">
        {!id && <h1>{pageMetaData.titlePage}</h1>}
        {page === "users" && <AdminUser />}
        {page === "vehicles" && <AdminVehicle />}
        {page === "bookings" && <AdminBooking />}
        {page === "categories" && <AdminCategory />}
        {page === "equipments" && <AdminEquipment />}
        {page === "pictures" && <AdminPicture />}
        {page === "messages" && <AdminMessage />}
        {page === "home" && (
          <p>
            Bienvenue dans votre espace administrateur. Gérez les utilisateurs,
            les véhicules, les réservations et bien plus encore depuis cette
            interface dédiée.
          </p>
        )}
      </section>
    </div>
  );
};
