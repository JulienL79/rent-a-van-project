import { contactFormData } from "./ContactFormData";
import { Form } from "../../organisms/Form";
import { PageMeta } from "../../atoms/PageMeta";
import { sendContactMessage } from "../../../api/contactApi";
import { handleSuccess } from "../../../utils/feedbackHandler";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import { contactValidation } from "@rent-a-van/shared/validators";
import { zodFieldErrors } from "@rent-a-van/shared/utils/zodFieldErrors";

export function Contact() {
  const handleSubmit = async (formData: {
    [key: string]: any;
  }): Promise<FormSubmitResult> => {
    try {
      const payloadParsed = contactValidation.safeParse(formData);
      if (!payloadParsed.success) {
        const errors = zodFieldErrors(payloadParsed.error);
        return { ok: false, errors: errors };
      }
      const response = await sendContactMessage(payloadParsed.data);
      handleSuccess(response.message);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }

      return { ok: false, errors: {} };
    }
  };

  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Contact"
        description="Contactez notre équipe RentAVan pour toute question ou demande."
      />

      <Form {...contactFormData} onSubmit={handleSubmit} />
    </div>
  );
}
