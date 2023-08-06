import { CSSProperties, ReactElement } from "react";

export type PositionPropT =
  | "topLeft"
  | "topRight"
  | "topCenter"
  | "leftTop"
  | "leftBottom"
  | "leftCenter"
  | "bottomLeft"
  | "bottomRight"
  | "bottomCenter"
  | "rightTop"
  | "rightBottom"
  | "rightCenter";

export type ACToolTipT = {
  children: ReactElement;
  label: string;
  position?: PositionPropT;
  style?: CSSProperties;
  showToolTip?: boolean;
};
