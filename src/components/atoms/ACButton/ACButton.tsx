import React, { Ref } from "react";
import "./ACButton.scss";

export interface ACButtonProps {
  color?: "primary" | "secondary" | "success" | "error";
  variant?: "contained" | "outlined" | "text";
  onClick?: (e: any) => void;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
  style?: React.CSSProperties;
  iconButton?: boolean;
  children?: React.ReactNode;
  dataTestid?: string;
  className?: string;
}

const ACButton = React.forwardRef(
  (
    {
      color = "primary",
      variant = "contained",
      onClick,
      size = "medium",
      type = "button",
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      href,
      style,
      iconButton,
      className,
      dataTestid = "acButton",
      children,
    }: ACButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    function onClickHandler(e: any) {
      onClick && onClick(e);
    }
    const ACButtonBase = (
      <div
        data-testid="button-wrapper"
        style={{ display: fullWidth ? "block" : "inline-block" }}
      >
        <button
          data-testid={dataTestid}
          onClick={(e) => onClickHandler(e)}
          className={`AC-Button AC-Button-${variant}-${color} AC-Button-${size} ${
            iconButton ? "AC-Button-iconButton" : ""
          } ${className || ""} `}
          disabled={disabled}
          type={type}
          style={style}
          ref={ref}
        >
          {leftIcon && (
            <span
              data-testid="leftIcon"
              className={`AC-Button-leftIcon ${iconButton ? "noMargin" : ""}`}
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              data-testid="rightIcon"
              className={`AC-Button-rightIcon ${iconButton ? "noMargin" : ""}`}
            >
              {rightIcon}
            </span>
          )}
        </button>
      </div>
    );

    if (href && href !== "") {
      return (
        <a href={href} target="_blank">
          {ACButtonBase}
        </a>
      );
    }

    return <>{ACButtonBase}</>;
  }
);

export default ACButton;
