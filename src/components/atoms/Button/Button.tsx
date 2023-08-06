import React, { Ref } from "react";
import "./Button.scss";

export interface ButtonProps {
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

const Button = React.forwardRef(
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
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    function onClickHandler(e: any) {
      onClick && onClick(e);
    }
    const ButtonBase = (
      <div
        data-testid="button-wrapper"
        style={{ display: fullWidth ? "block" : "inline-block" }}
      >
        <button
          data-testid={dataTestid}
          onClick={(e) => onClickHandler(e)}
          className={`Button Button-${variant}-${color} Button-${size} ${
            iconButton ? "Button-iconButton" : ""
          } ${className || ""} `}
          disabled={disabled}
          type={type}
          style={style}
          ref={ref}
        >
          {leftIcon && (
            <span
              data-testid="leftIcon"
              className={`Button-leftIcon ${iconButton ? "noMargin" : ""}`}
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              data-testid="rightIcon"
              className={`Button-rightIcon ${iconButton ? "noMargin" : ""}`}
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
          {ButtonBase}
        </a>
      );
    }

    return <>{ButtonBase}</>;
  }
);

export default Button;
