import type { IFormFieldWithSuggestionProps } from "./FormFieldWithSuggestion.props";
import React, { useRef, useState } from "react";
import "./FormFieldWithSuggestion.scss";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { useFilterStore } from "../../../store/useFilterStore";

export const FormFieldWithSuggestion: React.FC<
  IFormFieldWithSuggestionProps
> = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  fetchSuggestions,
  autoComplete = "off",
  value = "",
  classNameInput = "",
  required = false,
  isDisabled = false,
  options = [],
  error,
}) => {
  const [suggestions, setSuggestions] = useState<
    { code: string; nom: string }[]
  >([]);
  const debounceTimer = useRef<number | undefined>(undefined);
  const { setLocationCode } = useFilterStore();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = e.target.value;
    onChange(e);

    if (newValue.length > 2) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(async () => {
        const results = await fetchSuggestions(newValue);
        setSuggestions(results);
      }, 500);
    } else {
      setSuggestions([]);
    }

    if (id === "city") {
      setLocationCode(null);
    }
  };

  const handleSelect = (city: { code: string; nom: string }) => {
    const fakeEvent = {
      target: {
        value: city.nom,
        id,
        dataset: { code: city.code },
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    if (id === "city") {
      setLocationCode(city.code);
    }

    onChange(fakeEvent);
    setSuggestions([]);
  };

  return (
    <div className="form-field form-field-with-suggestion">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        type="text"
        name={name}
        required={required}
        autoComplete={autoComplete}
        classNameInput={classNameInput}
        options={options}
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
      {suggestions.length > 0 && !isDisabled && (
        <ul className="suggestion-list">
          {suggestions.map((city) => (
            <li key={city.code} onClick={() => handleSelect(city)}>
              {city.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
