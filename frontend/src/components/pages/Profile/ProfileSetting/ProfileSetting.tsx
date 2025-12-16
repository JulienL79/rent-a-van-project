import { useAuthStore } from "../../../../store/useAuthStore";
import { deleteUser } from "../../../../api/userApi";
import { useState } from "react";
import { handleError, handleSuccess } from "../../../../utils/feedbackHandler";
import { Modal } from "../../../organisms/Modal";
import { Button } from "../../../atoms/Button";
import "./ProfileSetting.scss";

export const ProfileSetting = () => {
  const [isConfirmModalOpened, setIsConfirmModalOpened] =
    useState<boolean>(false);
  const { user, checkAuth } = useAuthStore();

  const deleteUserById = async () => {
    let wasDeleted = false;

    try {
      if (!user)
        throw new Error(
          "Suppression du compte impossible : utilisateur non trouvé",
        );
      await deleteUser(user.id);
      handleSuccess("Compte supprimé avec succès !");
      wasDeleted = true;
      setIsConfirmModalOpened(false);
    } catch (err) {
      setIsConfirmModalOpened(false);
      handleError(
        err,
        "Une erreur est survenue lors de la suppression du compte",
      );
    }

    if (wasDeleted) {
      await checkAuth();
      return { ok: true };
    } else {
      return { ok: false, error: {} };
    }
  };

  return (
    <>
      <div className="setting-option">
        <p>Supprimer mon compte</p>
        <Button
          onClick={() => setIsConfirmModalOpened(true)}
          content="Supprimer"
          className=" inline-button danger-button"
        />
        {isConfirmModalOpened && (
          <Modal
            modalType="confirm"
            onClose={() => setIsConfirmModalOpened(false)}
            onConfirm={deleteUserById}
          />
        )}
      </div>
    </>
  );
};
