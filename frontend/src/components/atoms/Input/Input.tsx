import React from "react";
import type { IInputProps } from "./Input.props";
import "./Input.scss";

export const Input: React.FC<IInputProps> = ({
  id,
  type,
  name,
  placeholder,
  classNameInput = "",
  value = "",
  required = false,
  min,
  max,
  step,
  isDisabled = false,
  autoComplete = "on",
  onChange,
  checked = false,
  options = [],
}) => {
  if (type === "checkbox") {
    return (
      <input
        id={id}
        type="checkbox"
        name={name ?? id}
        className={classNameInput}
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
      />
    );
  }

  if (type === "number" || type === "range") {
    return (
      <input
        id={id}
        type={type}
        placeholder={!isDisabled ? placeholder : ""}
        className={classNameInput}
        value={value as string | number}
        required={required}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        name={name ?? id}
        disabled={isDisabled}
      />
    );
  }

  if (type === "textarea") {
    return (
      <textarea
        id={id}
        placeholder={!isDisabled ? placeholder : ""}
        className={classNameInput}
        value={value as string}
        required={required}
        autoComplete={autoComplete}
        minLength={min ? Number(min) : undefined}
        maxLength={max ? Number(max) : undefined}
        onChange={onChange}
        name={name ?? id}
        disabled={isDisabled}
      />
    );
  }

  if (type === "select" || type === "select-multiple") {
    return (
      <select
        id={id}
        name={name ?? id}
        className={classNameInput}
        required={required}
        disabled={isDisabled}
        multiple={type === "select-multiple"}
        value={
          type === "select-multiple"
            ? value || []
            : (value ?? options[0]?.value ?? "")
        }
        onChange={onChange}
      >
        {options.map((opt, index) => (
          <option key={`${opt.value}-${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={id}
      type={type}
      placeholder={!isDisabled ? placeholder : ""}
      className={classNameInput}
      value={value as string}
      required={required}
      autoComplete={autoComplete}
      minLength={min ? Number(min) : undefined}
      maxLength={max ? Number(max) : undefined}
      onChange={onChange}
      name={name ?? id}
      disabled={isDisabled}
    />
  );
};
