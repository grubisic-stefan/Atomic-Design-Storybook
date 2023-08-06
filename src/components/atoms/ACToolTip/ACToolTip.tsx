import React from "react";

import { positionToolT } from "./helper";

import { ACToolTipT } from "./types";

import "./ACToolTip.scss";

const ACToolTip = ({
  children,
  label,
  style,
  showToolTip = true,
  position = "topCenter",
}: ACToolTipT) => {
  return (
    <div data-testid="toolTipRoot" className="ACToolTip">
      {showToolTip && (
        <div
          data-testid="toolTipLabel"
          style={{ ...positionToolT(position), ...style }}
          className="ACToolTip__label"
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

export default ACToolTip;
