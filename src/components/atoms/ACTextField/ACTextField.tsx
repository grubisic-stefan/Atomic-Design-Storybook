import React, { Ref, useState, useEffect } from "react";
import "./ACTextField.scss";

export interface TextFieldProps {
  label?: string;
  variant?: "outlined" | "filled" | "standard";
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: string;
  value?: string;
  required?: boolean;
  helperText?: string;
  color?: "primary" | "secondary" | "success" | "error";
  name?: string;
  error?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onBlur?: () => void;
  ref?: Ref<HTMLInputElement>;
}

const ACTextField = React.forwardRef(
  (
    {
      variant = "outlined",
      label,
      placeholder,
      id,
      disabled = false,
      fullWidth = false,
      type = "text",
      required = false,
      helperText,
      color = "primary",
      name,
      value = undefined,
      error = false,
      autoFocus = false,
      defaultValue,
      autoComplete,
      onChange,
      onClick,
      onBlur,
    }: TextFieldProps,
    ref
  ) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [focus, setFocus] = useState(autoFocus);

    const localInputRef = React.useRef<HTMLInputElement | null>(null);

    let variantClassName = `AC-TextField-${variant}`;

    const removeFocusHandler = () => {
      setFocus(false);
    };

    const setFocusHandler = () => {
      setFocus(true);
    };

    function mergeRefs(...refs: any) {
      const filteredRefs = refs.filter(Boolean);
      if (!filteredRefs.length) return null;
      if (filteredRefs.length === 0) return filteredRefs[0];
      return (inst: any) => {
        for (const ref of filteredRefs) {
          if (typeof ref === "function") {
            ref(inst);
          } else if (ref) {
            ref.current = inst;
          }
        }
      };
    }

    const checkIfInputHasValueForControlledAndUncontrolledComponent = () => {
      if (localInputRef.current?.value) {
        setIsEmpty(false);
        return;
      }

      if (value !== "" && value !== undefined) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    };

    useEffect(() => {
      checkIfInputHasValueForControlledAndUncontrolledComponent();
    }, [value]);

    const isEmptyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    };

    const inputHasValueClass = isEmpty ? "" : "input-has-value";
    const inputIsFocused = focus ? "focused" : "";
    const inputHasNoLabel = !label ? "AC-TextField-input-has-no-label" : "";
    const inputIsDisabled = disabled ? "AC-TextField--disabled" : "";
    const isFulLWidth = fullWidth ? "AC-TextField--fullWidth" : "";
    const hasError = error ? "AC-TextField--error" : "";

    return (
      <div
        data-testid="textfield-root"
        className={`${inputIsFocused} AC-TextField-root ${variantClassName} AC-TextField-color-${color} ${inputIsDisabled} ${isFulLWidth} ${hasError}`.trim()}
      >
        <label
          className={`AC-TextField-label ${inputIsFocused} ${inputHasValueClass}`.trim()}
          htmlFor={id}
        >
          {label}
          {required ? <span className="AC-TextField-asterisk">*</span> : null}
        </label>
        <div className="AC-InputBase-root">
          <input
            id={id}
            className={`AC-TextField-input ${
              label ? "AC-TextField-input-has-label" : ""
            }`.trim()}
            type={type}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            name={name}
            onBlur={() => {
              removeFocusHandler();
              onBlur && onBlur();
            }}
            autoFocus={autoFocus}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              onChange && onChange(e);
              isEmptyHandler(e);
            }}
            autoComplete={autoComplete}
            onClick={() => {
              setFocusHandler();
              onClick && onClick();
            }}
            ref={mergeRefs(localInputRef, ref)}
          />
          {variant === "outlined" ? (
            <fieldset
              className={`AC-TextField-fieldset ${inputIsFocused} ${inputHasValueClass} ${inputHasNoLabel}`.trim()}
            >
              <legend className="AC-TextField-legend">
                <span className="AC-TextField-legend-span">
                  {label}
                  {required ? (
                    <span className="AC-TextField-asterisk">*</span>
                  ) : null}
                </span>
              </legend>
            </fieldset>
          ) : null}
        </div>
        {helperText ? (
          <p className="AC-TextField-helper-text">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
export default ACTextField;
