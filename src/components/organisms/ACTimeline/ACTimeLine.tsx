import React from "react";

import ACTimeDotLine from "./ACTimeDotLine/ACTimeDotLine";
import ACTimeLabel from "./ACTimeLabel/ACTimeLabel";
import ACTimePoint from "./ACTimePoint/ACTimePoint";

import { ACTimeLinePropsT } from "./Types";
import "./ACTimeLine.scss";

const ACTimeLine = ({
  content,
  sides = "both",
  style,
  className,
}: ACTimeLinePropsT) => {
  return (
    <div
      style={style?.wrapper}
      className={`ACTimeLine__wrapper ${className || ""}`}
      role="ACTimeLine"
    >
      {content.map((item, index) => {
        return (
          <ACTimePoint key={index} length={content.length} index={index}>
            <ACTimeLabel
              style={style?.labelLeftWrapper}
              item={item}
              sides={sides}
              LabelSide="left"
            />
            <ACTimeDotLine
              style={style}
              item={item}
              length={content.length}
              index={index}
            />
            <ACTimeLabel
              style={style?.labelRightWrapper}
              sides={sides}
              item={item}
              LabelSide="right"
            />
          </ACTimePoint>
        );
      })}
    </div>
  );
};

export default ACTimeLine;
