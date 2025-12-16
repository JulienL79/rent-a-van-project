import { PageMeta } from "../../atoms/PageMeta";
import { registerFormData } from "./RegisterFormData";
import { Form } from "../../organisms/Form";

export function Register() {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Inscription"
        description="Créez votre compte RentAVan et réservez votre van en quelques clics."
      />

      <Form {...registerFormData} />
    </div>
  );
}
