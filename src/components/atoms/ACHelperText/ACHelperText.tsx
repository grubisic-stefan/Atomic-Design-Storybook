import React from "react";
import clsx from "clsx";
import HelperText from "./styled/HelperText";

export type HelperTextProps = {
  className?: string;
  children?: React.ReactNode;
  hasError?: boolean;
  hasAlert?: boolean;
  style?: React.CSSProperties;
  dataTestId?: string;
};

const ACHelperText = ({
  children,
  hasAlert,
  hasError,
  style,
  dataTestId,
}: HelperTextProps) => {
  const helperTextClasses = clsx("ac-input-helper-text", {
    "has-error": hasError,
    "has-alert": hasAlert,
  });
  return (
    <HelperText
      data-testid={dataTestId}
      style={style}
      className={helperTextClasses}
    >
      {children}
    </HelperText>
  );
};

export default ACHelperText;
