import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import { PageMeta } from "../../atoms/PageMeta";
import { useNavigate, useParams } from "react-router-dom";
import { requestResetPassword, resetPassword } from "../../../api/resetApi";
import { Form } from "../../organisms/Form";
import { ResetRequestFormData } from "./ResetRequestFormData";
import { ResetConfirmFormData } from "./ResetConfirmFormData";
import { handleSuccess } from "../../../utils/feedbackHandler";
import { useEffect } from "react";
import { uuidValidator } from "@rent-a-van/shared/validators";

export const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    [key: string]: any;
  }): Promise<FormSubmitResult> => {
    try {
      if (token) {
        const payload = {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        const response = await resetPassword(token, payload);
        handleSuccess(response.message);
        navigate("/login");
      } else {
        const email = formData.email as string;
        const response = await requestResetPassword(email);
        handleSuccess(response.message);
        navigate("/login");
      }
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }

      return { ok: false, errors: {} };
    }
  };

  useEffect(() => {
    if (token) {
      const tokenParsed = uuidValidator.safeParse(token);
      if (!tokenParsed.success) {
        navigate("/");
      }
    }
  }, [token]);

  return (
    <>
      <PageMeta
        title="RentAVan - Réinitialisation du mot de passe"
        description="Réinitialisez votre mot de passe"
      />

      <Form
        {...(token ? ResetConfirmFormData : ResetRequestFormData)}
        onSubmit={handleSubmit}
      />
    </>
  );
};
