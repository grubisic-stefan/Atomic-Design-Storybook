import React from "react";
import Spinner from "./styled/Spinner";

const ACSpinner = ({
  className,
  size = "md",
  background = "#30bf10",
}: ACSpinnerProps) => {
  const borderColor = {
    borderColor: `${background} transparent transparent transparent`,
  };
  return (
    <Spinner data-testid="spinner" className={`${size} ${className}`}>
      <div className="rings">
        <div data-testid="border" style={borderColor}></div>
        <div style={borderColor}></div>
        <div style={borderColor}></div>
        <div style={borderColor}></div>
      </div>
    </Spinner>
  );
};

export default ACSpinner;

export type ACSpinnerProps = {
  className?: string;
  background?: string;
  size?: "xs" | "sm" | "md" | "lg";
};
