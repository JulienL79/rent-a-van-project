import React, { useEffect } from "react";
import type { IFormProps, TFormFieldConfig } from "./Form.props";
import { FormField } from "../../molecules/FormField";
import { Button } from "../../atoms/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactInfo } from "../../molecules/ContactInfo";
import { useFilterStore } from "../../../store/useFilterStore";
import "./Form.scss";
import {
  FormFieldWithSuggestion,
  type IFormFieldWithSuggestionProps,
} from "../../molecules/FormFieldWithSuggestion";
import { handleError, handleSuccess } from "../../../utils/feedbackHandler";

type FormValue = string | File | boolean | string[];

export const Form: React.FC<IFormProps> = ({
  fields,
  onSubmit,
  buttonContent,
  title,
  type,
  isDisabled = false,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();
  const { vehicleType, setVehicleType } = useFilterStore();

  const isFieldWithSuggestion = (
    field: TFormFieldConfig,
  ): field is Extract<TFormFieldConfig, { kind: "suggestion" }> => {
    return field.kind === "suggestion";
  };

  const handleChangeType = (type: "camping-car" | "van") => {
    setVehicleType(type);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { id, type, value } = target;

    let newValue: FormValue;

    if (type === "file") {
      newValue = (target as HTMLInputElement).files?.[0] ?? "";
    } else if (type === "checkbox") {
      newValue = (target as HTMLInputElement).checked;
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(
        (target as HTMLSelectElement).selectedOptions,
      );
      newValue = selectedOptions.map((opt) => opt.value);
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    const field = fields.find((f) => f.id === id);
    if (field?.onChange) {
      if (type === "textarea") {
        field.onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
      } else if (type === "select-one" || type === "select-multiple") {
        field.onChange(e as React.ChangeEvent<HTMLSelectElement>);
      } else {
        field.onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await onSubmit(formData);

      if (result?.ok) {
        setFormData({});
        setFormErrors({});
        const navigateTo =
          type === "login" ? "/" : type === "register" ? "/login" : null;
        if (navigateTo) {
          navigate(navigateTo, { replace: true });
        }

        const messageToast =
          type === "register"
            ? "Inscription réussie ! Vous pouvez maintenant vous connecter."
            : null;
        if (messageToast) {
          handleSuccess(messageToast);
        }
      } else if (result?.errors) {
        setFormErrors(result.errors);
      }
    } catch (err) {
      handleError(
        err,
        "Une erreur est survenue lors de la soumission du formulaire",
      );
    }
  };

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};

    fields.forEach((field) => {
      if (field.type === "checkbox") {
        initialValues[field.id] = field.checked ?? false;
      } else if (field.type === "select-multiple") {
        initialValues[field.id] = field.value ?? [];
      } else {
        initialValues[field.id] =
          field.value ?? field.options?.[0]?.value ?? "";
      }
    });

    setFormData(initialValues);
  }, [fields]);

  return (
    <div className={`form-container ${type}-form`}>
      {type !== "search" && <h2 className="form-title">{title}</h2>}
      <form onSubmit={handleSubmit} className="form">
        {/* Seulement pour le form de recherche */}
        {type === "search" && (
          <div className="toggle-switch-search">
            <p
              onClick={() => handleChangeType("camping-car")}
              className={vehicleType === "camping-car" ? "active" : ""}
            >
              Camping-car
            </p>
            <p
              onClick={() => handleChangeType("van")}
              className={vehicleType === "van" ? "active" : ""}
            >
              Van
            </p>
          </div>
        )}

        {fields.map((field) => {
          // Si le champ doit afficher des suggestions
          if (isFieldWithSuggestion(field) && field.withSuggestions === true) {
            return (
              <FormFieldWithSuggestion
                key={field.id}
                label={field.label}
                type="text"
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                fetchSuggestions={field.fetchSuggestions}
                withSuggestions={true}
                value={formData[field.id] || ""}
                options={
                  (field.options as IFormFieldWithSuggestionProps["options"]) ||
                  undefined
                }
                error={formErrors[field.id]}
                isDisabled={isDisabled}
              />
            );
          } else {
            const fieldValue = formData[field.id];
            const isRange = field.type === "range";

            // Pour les labels dynamiques sur les range
            const dynamicLabel = isRange
              ? `${field.label} : ${fieldValue} km`
              : field.label;

            return (
              <FormField
                key={field.id}
                label={dynamicLabel}
                id={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                step={field.step}
                value={
                  field.type === "checkbox" ? undefined : formData[field.id]
                }
                checked={
                  field.type === "checkbox" ? formData[field.id] : undefined
                }
                options={field.options || undefined}
                error={formErrors[field.id]}
                isDisabled={isDisabled}
              />
            );
          }
        })}
        {!isDisabled && (
          <Button
            content={buttonContent}
            isDisabled={isDisabled}
            className="primary-button form-button"
          />
        )}
      </form>

      {/* ====================================================
                FORM FOOTER
                ======================================================== */}

      {type === "login" && (
        <div className="form-footer">
          <p>
            Pas encore inscrit ?{" "}
            <Link to="/register" className="text-link">
              S'inscrire
            </Link>
          </p>
          <p>
            Mot passe oublié ?{" "}
            <Link to="/reset" className="text-link">
              Réinitialiser
            </Link>
          </p>
        </div>
      )}
      {type === "register" && (
        <div className="form-footer">
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" className="text-link">
              Se connecter
            </Link>
          </p>
        </div>
      )}
      {type === "resetRequest" && (
        <div className="form-footer">
          <p>
            <Link to="/login" className="text-link">
              Revenir à l'écran de connexion
            </Link>
          </p>
        </div>
      )}
      {type === "resetConfirm" && (
        <div className="form-footer">
          <p>
            <Link to="/login" className="text-link">
              Revenir à l'écran de connexion
            </Link>
          </p>
          <p>
            Demande expirée ?{" "}
            <Link to="/reset" className="text-link">
              Refaire une demande
            </Link>
          </p>
        </div>
      )}
      {type === "contact" && (
        <div className="form-footer">
          <ContactInfo />
        </div>
      )}
    </div>
  );
};
