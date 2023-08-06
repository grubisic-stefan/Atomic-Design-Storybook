import React from "react";

import ACTimePointLabel from "./ACTimePointLabel";

import { LabelPropT } from "../Types";

const ACTimeLabel = ({ item, LabelSide, sides, style }: LabelPropT) => {
  let labelRender;
  let label;
  let className;

  if (LabelSide === "right") {
    labelRender = item?.labelRightRender;
    label = item?.labelRight;
    className = "ACTimeLine__right-label";
  } else {
    labelRender = item?.labelLeftRender;
    label = item?.labelLeft;
    className = "ACTimeLine__left-label";
  }

  if (labelRender) {
    return (
      <div role="ACTimeLineLabel" style={style} className={className}>
        {labelRender}
      </div>
    );
  }

  if (label)
    return (
      <div role="ACTimeLineLabel" style={style} className={className}>
        <ACTimePointLabel>{label}</ACTimePointLabel>
      </div>
    );

  if (!label && LabelSide == "left" && (sides === "both" || sides === "left"))
    return (
      <div
        role="ACTimeLineLabelEmpty"
        style={style}
        className="ACTimeLine__left-label"
      ></div>
    );
  return null;
};

export default ACTimeLabel;
