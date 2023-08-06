import React, { CSSProperties, FC, ReactNode } from "react";
import { ChipWrapper } from "./styled/ChipWrapper";

export interface ChipProps {
  label: string;
  color?: "primary" | "secondary" | "success" | "error";
  variant?: "filled" | "outlined";
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  leftIcon?: ReactNode;
  onLeftIconClick?: () => void;
  rightIcon?: ReactNode;
  onRightIconClick?: (e: any) => void;
  style?: CSSProperties;
}

const Chip: FC<ChipProps> = ({
  label,
  size = "medium",
  leftIcon,
  onLeftIconClick,
  rightIcon,
  onRightIconClick,
  onClick,
  disabled = false,
  color = "primary",
  variant = "filled",
  style,
}) => {
  function onRightIconClickHandler(e: any) {
    onRightIconClick && onRightIconClick(e);
  }
  return (
    <ChipWrapper
      dataset={{ color, variant, disabled, size, testid: "Chip" }}
      style={style}
      className="Chip"
    >
      {leftIcon && (
        <span onClick={onLeftIconClick} className="Chip-leftIcon">
          {leftIcon}
        </span>
      )}
      <span
        onClick={onClick}
        className="Chip-label"
        style={!leftIcon && !rightIcon ? { padding: "10px" } : {}}
      >
        {label}
      </span>
      {rightIcon && (
        <span
          onClick={onRightIconClickHandler}
          className="Chip-rightIcon"
          data-testid="Chip-rightIcon-test-id"
        >
          {rightIcon}
        </span>
      )}
    </ChipWrapper>
  );
};

export default Chip;
