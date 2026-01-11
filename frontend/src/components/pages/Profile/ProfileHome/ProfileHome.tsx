import { useEffect, useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import {
  profileCredentialsFormData,
  profileDetailsFormData,
} from "./ProfileUserFormData";
import { Form, type IFormProps } from "../../../organisms/Form";
import { formatShortDateFr } from "../../../../utils/DateConverter";
import { Button } from "../../../atoms/Button";
import type { FormSubmitResult } from "../../../../types/FormSubmitResult";
import { motion } from "framer-motion";
import type { IUserDetails } from "./ProfileHome.props";
import {
  fetchUserByIdWithDetails,
  updateUser,
  updateUserCredentials,
} from "../../../../api/userApi";
import { handleSuccess } from "../../../../utils/feedbackHandler";
import {
  updateCredentialsValidation,
  userUpdateValidation,
} from "@rent-a-van/shared/validators";
import { zodFieldErrors } from "@rent-a-van/shared/utils/zodFieldErrors";

export const ProfileHome = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [isUpdatingUserCredentials, setIsUpdatingUserCredentials] =
    useState(false);
  const [isUpdatingUserDetails, setIsUpdatingUserDetails] = useState(false);
  const [formDataWithUserDetails, setFormDataWithUserDetails] =
    useState<IFormProps>(profileDetailsFormData);
  const { user } = useAuthStore();

  // Fonction pour gérer la soumission du formulaire de mise à jour des informations utilisateur
  const handleSubmit = async (formData: {
    [key: string]: any;
  }): Promise<FormSubmitResult> => {
    try {
      if (user && isUpdatingUserCredentials) {
        const payloadParsed = updateCredentialsValidation.safeParse(formData);
        if (!payloadParsed.success) {
          const errors = zodFieldErrors(payloadParsed.error);
          return { ok: false, errors: errors };
        }
        await updateUserCredentials(user.id, payloadParsed.data);
        handleSuccess("Identifiants mis à jour avec succès !");
      } else if (user && isUpdatingUserDetails) {
        const payloadParsed = userUpdateValidation.safeParse(formData);
        if (!payloadParsed.success) {
          const errors = zodFieldErrors(payloadParsed.error);
          return { ok: false, errors: errors };
        }
        await updateUser(user.id, payloadParsed.data);
        handleSuccess("Informations mises à jour avec succès !");
      }
      setIsUpdatingUserDetails(false);
      setIsUpdatingUserCredentials(false);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }

      return { ok: false, errors: {} };
    }
  };

  // Fonction pour récupérer les détails de l'utilisateur
  const fetchUserDetails = async (): Promise<IUserDetails | null> => {
    if (!user) return null;
    const userDetails = await fetchUserByIdWithDetails(user.id);

    if (!userDetails) return null;
    return {
      ...userDetails.data,
      profilePicture: userDetails.data.pictures[0] || null,
    };
  };

  // Charger les détails de l'utilisateur à l'ouverture de la page et après une mise à jour
  useEffect(() => {
    const loadUserDetails = async () => {
      const details = await fetchUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    if (!isUpdatingUserDetails && !isUpdatingUserCredentials) {
      loadUserDetails();
    }
  }, [isUpdatingUserDetails, isUpdatingUserCredentials]);

  // Mettre à jour les données du formulaire lorsque les détails de l'utilisateur changent
  useEffect(() => {
    if (!userDetails) return;
    const formDatas = isUpdatingUserCredentials
      ? profileCredentialsFormData
      : profileDetailsFormData;
    const updatedFields = formDatas.fields.map((field) => {
      const rawValue = userDetails?.[field.id as keyof IUserDetails];

      let value = "";
      if (field.type === "date" && typeof rawValue === "string") {
        value = rawValue.split("T")[0]; // extrait "1997-12-20"
      } else if (typeof rawValue === "string" || typeof rawValue === "number") {
        value = String(rawValue);
      }

      return {
        ...field,
        value,
      };
    });

    setFormDataWithUserDetails({
      ...formDatas,
      fields: updatedFields,
    });
  }, [userDetails, isUpdatingUserCredentials]);

  return (
    <>
      {userDetails?.createdAt && (
        <p className="extra-title">
          (Créé le {formatShortDateFr(userDetails.createdAt)})
        </p>
      )}
      <motion.div
        key={isUpdatingUserCredentials ? "credentials" : "details"}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <Form
          isDisabled={
            isUpdatingUserCredentials ? false : !isUpdatingUserDetails
          }
          {...formDataWithUserDetails}
          onSubmit={handleSubmit}
        />

        <div className="button-group">
          {!isUpdatingUserDetails && !isUpdatingUserCredentials && (
            <>
              <Button
                onClick={() => setIsUpdatingUserDetails(true)}
                content="Modifier mes informations"
                isScrollToTop={true}
              />
              <Button
                onClick={() => setIsUpdatingUserCredentials(true)}
                content="Modifier mes identifiants"
                isScrollToTop={true}
              />
            </>
          )}
          {isUpdatingUserDetails && (
            <>
              <Button
                onClick={() => setIsUpdatingUserDetails(false)}
                content="Annuler"
                className="danger-button"
                isScrollToTop={true}
              />
            </>
          )}
          {isUpdatingUserCredentials && (
            <>
              <Button
                onClick={() => setIsUpdatingUserCredentials(false)}
                content="Annuler"
                className="danger-button"
                isScrollToTop={true}
              />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};
