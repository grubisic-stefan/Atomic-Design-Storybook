import React, { useState } from "react";
import "./ACLoading.scss";

export interface ACLoadingProps {
  loadingElement: React.ReactNode;
  isLoading: boolean;
  children?: React.ReactNode;
  blur?: boolean;
}

const ACLoading: React.FC<ACLoadingProps> = ({
  children,
  loadingElement,
  isLoading,
  blur = false,
}) => {
  return (
    <div className="ACLoading-wrapper">
      <div
        data-testid="loading"
        style={blur ? { backdropFilter: "blur(5px)" } : {}}
        className={`ACLoading-loading ${
          isLoading ? "ACLoading-loading-true" : "ACLoading-loading-false"
        }`}
      >
        {loadingElement}
      </div>
      {children}
    </div>
  );
};

export default ACLoading;
