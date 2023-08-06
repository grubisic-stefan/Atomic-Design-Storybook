import React from "react";

import { ACTimeLineDotLinePropT } from "../Types";

const ACTimeDotLine = ({
  item,
  length,
  index,
  style,
}: ACTimeLineDotLinePropT) => {
  const ifLine = index !== length - 1;

  if (item?.dotRender) {
    return (
      <div style={style?.dotLineWrapp} className="ACTimeLine__time-dotLine">
        {item.dotRender}
        {ifLine && (
          <div
            role="ACTimeLineLine"
            style={style?.line}
            className="ACTimeLine__time-line"
          />
        )}
      </div>
    );
  }

  return (
    <div style={style?.dotLineWrapp} className="ACTimeLine__time-dotLine">
      <div style={style?.dot} className="ACTimeLine__time-dot" />
      {ifLine && (
        <div
          role="ACTimeLineLine"
          style={style?.line}
          className="ACTimeLine__time-line"
        />
      )}
    </div>
  );
};

export default ACTimeDotLine;
