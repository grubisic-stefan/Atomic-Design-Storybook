import React, { CSSProperties, useEffect } from "react";

import "./ACBackdrop.scss";

export type ACBackdropPropsT = {
  onClose?: () => void;
  style?: CSSProperties;
};

const ACBackdrop = ({ onClose, style }: ACBackdropPropsT) => {
  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key == "Escape") return onClose && onClose();
  };
  useEffect(() => {
    window.addEventListener("keydown", closeOnEsc);

    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);
  return (
    <div
      data-testid="ACBackdropRoot"
      style={style}
      onClick={onClose}
      className="ACBackdrop"
    />
  );
};

export default ACBackdrop;
