import React from "react";

import "./ACTypography.scss";

export interface ACTypographyProps {
  align: "center" | "inherit" | "justify" | "left" | "right";
  children: React.ReactNode;
  style: React.CSSProperties;
  component: React.ElementType;
  gutterBottom: boolean;
  noWrap: boolean;
  paragraph: boolean;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "button";
}

const ACTypography = ({
  variant = "body1",
  align = "inherit",
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  children,
  style,
  component,
  ...props
}: Partial<ACTypographyProps>) => {
  let CustomTag: React.ElementType;
  if (variant === "body1" || variant === "body2") {
    CustomTag = "p";
  } else if (variant === "caption" || variant === "button") {
    CustomTag = "span";
  } else {
    CustomTag = variant;
  }
  // paragraph === true changes tag to <p> and adds additional class with margin bottom
  if (paragraph) CustomTag = "p";

  if (component) CustomTag = component;

  return (
    <>
      <CustomTag
        style={style}
        className={`${
          align !== "inherit" ? `AC-Typography-align-${align}` : ""
        } AC-Typography-base AC-Typography-${variant}  ${
          gutterBottom ? "AC-Typography-gutterBottom" : ""
        } ${noWrap ? "AC-Typography-noWrap" : ""} ${
          paragraph ? "AC-Typography-paragraph" : ""
        }`.trim()}
      >
        {children}
      </CustomTag>
    </>
  );
};

export default ACTypography;
