import React from "react";

import { ACTimePointPropT } from "../Types";

const ACTimePoint = ({ children, index, length, style }: ACTimePointPropT) => {
  const ifLast = index == length - 1;

  return (
    <div
      style={style?.pointWrapper}
      className={`ACTimeLine__time-point ${
        ifLast ? "ACTimeLine__time-point--last" : ""
      }`}
      role="ACTimePoint"
    >
      {children}
    </div>
  );
};

export default ACTimePoint;
