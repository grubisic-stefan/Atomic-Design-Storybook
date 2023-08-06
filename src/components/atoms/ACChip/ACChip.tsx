import React, { CSSProperties, FC, ReactNode } from "react";
import { ChipWrapper } from "./styled/ChipWrapper";

export interface ACChipProps {
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

const ACChip: FC<ACChipProps> = ({
  label,
  size = "medium",
  leftIcon,
  onLeftIconClick,
  rightIcon,
  onRightIconClick,
  onClick,
  disabled=false,
  color = "primary",
  variant = "filled",
  style,
}) => {
  function onRightIconClickHandler(e: any) {
    onRightIconClick && onRightIconClick(e);
  }
  return (
    <ChipWrapper
      dataset={{ color, variant, disabled, size, testid:"ACChip" }}
      style={style}
      className="ACChip"
    >
      {leftIcon && (
        <span onClick={onLeftIconClick} className="ACChip-leftIcon">
          {leftIcon}
        </span>
      )}
      <span
        onClick={onClick}
        className="ACChip-label"
        style={!leftIcon && !rightIcon ? { padding: "10px" } : {}}
      >
        {label}
      </span>
      {rightIcon && (
        <span
          onClick={onRightIconClickHandler}
          className="ACChip-rightIcon"
          data-testid="ACChip-rightIcon-test-id"
        >
          {rightIcon}
        </span>
      )}
    </ChipWrapper>
  );
};

export default ACChip;
