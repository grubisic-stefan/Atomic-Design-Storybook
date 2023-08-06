import React, { CSSProperties, useState } from "react";

import "./ACMenuBtn.scss";

export type ACMenuBtnT = {
  onClick?: () => void;
  style?: {
    btnWrap: CSSProperties;
    btnline: CSSProperties;
  };
  className?: string;
};

export default function ACMenuBtn({
  onClick = () => {},
  style,
  className,
}: ACMenuBtnT) {
  const [isOpen, setIsOpen] = useState(false);

  const btnClickHendle = (e: any) => {
    onClick();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      style={style?.btnWrap}
      onClick={btnClickHendle}
      className={`ACMenuBtn ${className}`}
      data-testid="ACMenuBtnRoot"
    >
      <div
        data-testid="ACMenuBtnline1"
        style={style?.btnline}
        className={`ACMenuLine ${isOpen ? "ACMenuOpen" : ""}`}
      ></div>
      <div
        data-testid="ACMenuBtnline2"
        style={style?.btnline}
        className={`ACMenuLine ${isOpen ? "ACMenuOpen" : ""}`}
      ></div>
      <div
        data-testid="ACMenuBtnline3"
        style={style?.btnline}
        className={`ACMenuLine ${isOpen ? "ACMenuOpen" : ""}`}
      ></div>
    </div>
  );
}
