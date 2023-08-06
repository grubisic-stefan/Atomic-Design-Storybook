import { CSSProperties } from "react";

export type StyleT = {
  wrapper?: CSSProperties;
  pointWrapper?: CSSProperties;
  labelLeftWrapper?: CSSProperties;
  labelRightWrapper?: CSSProperties;
  dotLineWrapp?: CSSProperties;
  line?: CSSProperties;
  dot?: CSSProperties;
};

export type ACTimeLineContentT = {
  labelLeft?: string;
  labelRight?: string;
  labelLeftRender?: any;
  labelRightRender?: any;
  dotRender?: any;
};

export type ACTimeLinePropsT = {
  content: ACTimeLineContentT[];
  sides: "left" | "right" | "both";
  style?: StyleT;
  className?: string;
};

export type ACTimePointPropT = {
  children: any;
  index: number;
  length: number;
  style?: StyleT;
};

export type LabelPropT = {
  item: ACTimeLineContentT;
  LabelSide: "right" | "left";
  sides: "left" | "right" | "both";
  style?: CSSProperties;
};

export type ACTimeLineDotLinePropT = {
  item: ACTimeLineContentT;
  length: number;
  index: number;
  style?: StyleT;
};
