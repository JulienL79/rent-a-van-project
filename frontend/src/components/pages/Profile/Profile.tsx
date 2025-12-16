import { PageMeta } from "../../atoms/PageMeta";
import type { IProfileMetaData } from "./Profile.props";
import { profileMetaDatas } from "./ProfileMetaData";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.scss";
import { Aside } from "../../molecules/Aside";
import { ProfileHome } from "./ProfileHome";
import { ProfileBooking } from "./ProfileBooking";
import { ProfileVehicle } from "./ProfileVehicle";
import { ProfileSetting } from "./ProfileSetting";
import { ProfileMessage } from "./ProfileMessage";
import { Vehicle } from "../../organisms/Vehicle";
import { AuthRedirector } from "../../../routes/AuthRedirector";

export const Profile = () => {
  const { page, id } = useParams();
  const [pageMetaData, setPageMetaData] = useState<IProfileMetaData>(
    profileMetaDatas.find((meta) => meta.page === (page || "home"))!,
  );

  // Charger les métadonnées de la page en fonction du paramètre d'URL
  useEffect(() => {
    const metaData = profileMetaDatas.find((meta) => meta.page === page);

    if (metaData) {
      setPageMetaData(metaData);
    }
  }, [page]);

  return (
    <div className="page profile-page">
      <PageMeta
        title={pageMetaData.title}
        description={pageMetaData.description}
      />

      <AuthRedirector />
      <Aside page="profile" active={pageMetaData.page} />

      <section className="content">
        {page !== "vehicle-details" && <h1>{pageMetaData.titlePage}</h1>}
        {page === "home" && <ProfileHome />}
        {page === "vehicles" && <ProfileVehicle />}
        {page === "bookings" && <ProfileBooking />}
        {page === "settings" && <ProfileSetting />}
        {page === "mailbox" && <ProfileMessage />}
        {page === "vehicle-details" && id && (
          <Vehicle page="profile" id={id} onInteract={() => {}} />
        )}
      </section>
    </div>
  );
};
