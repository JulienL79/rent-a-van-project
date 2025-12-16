import { PageMeta } from "../../atoms/PageMeta";
import { loginFormData } from "./LoginFormData";
import { Form } from "../../organisms/Form";

export function Login() {
  return (
    <div className="page">
      <PageMeta
        title="RentAVan - Connexion"
        description="Connectez-vous à votre compte RentAVan"
      />

      <Form {...loginFormData} />
    </div>
  );
}
