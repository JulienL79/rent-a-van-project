import type { IFormFieldProps } from "./FormField.props";
import React from "react";
import "./FormField.scss";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";

export const FormField: React.FC<IFormFieldProps> = ({
  label,
  id,
  type,
  name,
  placeholder,
  onChange,
  autoComplete = "on",
  value = "",
  classNameInput = "",
  required = false,
  min,
  max,
  step,
  isDisabled = false,
  options = [],
  checked = false,
  error,
}) => {
  if (classNameInput === "other") {
    return <></>;
  }

  if (type === "checkbox") {
    return (
      <>
        <div className="form-field checkbox-field">
          <Input
            id={id}
            checked={checked}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            required={required}
            min={min}
            max={max}
            autoComplete={autoComplete}
            step={step}
            classNameInput={classNameInput}
            options={options}
            isDisabled={isDisabled}
          />
          <Label htmlFor={id}>{label}</Label>
        </div>
        {Array.isArray(error) && (
          <div className="form-field-errors">
            {error.map((errMsg, index) => (
              <p key={`error-${index}`} className="form-field-error">
                {errMsg}
              </p>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`form-field`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        required={required}
        min={min}
        max={max}
        autoComplete={autoComplete}
        step={step}
        options={options}
        classNameInput={classNameInput}
        isDisabled={isDisabled}
      />
      {Array.isArray(error) && (
        <div className="form-field-errors">
          {error.map((errMsg, index) => (
            <p key={`error-${index}`} className="form-field-error">
              {errMsg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
