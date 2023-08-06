import React, { FC, ChangeEvent } from "react";
import { ACEvenType } from "../../../globalTypes";
import "./ACSwitch.scss";

export interface ACSwitchProps {
  checked: boolean;
  onChange: (e: ACEvenType<ChangeEvent<HTMLInputElement>, boolean>) => void;
  id?: string;
  label?: string;
  labelPlacement?: "bottom" | "end" | "start" | "top";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  disabled?: boolean;
  name?: string;
}

const ACSwitch: FC<ACSwitchProps> = ({
  checked,
  onChange,
  id,
  label,
  labelPlacement = "start",
  size = "md",
  color = "primary",
  name,
  disabled = false,
}) => {
  return (
    <label
      className={`ACSwitch-label ${
        disabled ? "ACSwitch-label-disabled" : ""
      } ACSwitch-label-${labelPlacement}`}
      htmlFor={id}
      data-testid="ACSwitch"
    >
      <div
        className={`ACSwitch ${
          checked ? "ACSwitch-on" : "ACSwitch-off"
        } ACSwitch-${size} ACSwitch-${color} ${
          disabled ? "ACSwitch-disabled" : ""
        }`}
      >
        <div
          className={`ACSwitch-ball ${
            checked ? "ACSwitch-ball-on" : "ACSwitch-ball-off"
          } ACSwitch-ball-${color} ${disabled ? "ACSwitch-ball-disabled" : ""}`}
        ></div>
        <input
          className="ACSwitch-input"
          id={id}
          type="checkbox"
          onChange={(e) =>
            onChange({
              ...e,
              ac: { value: e.target.checked, name, type: "checkbox" },
            })
          }
          disabled={disabled}
        />
      </div>

      {label && <span data-testid="ACSwitch-label"> {label} </span>}
    </label>
  );
};

export default ACSwitch;
