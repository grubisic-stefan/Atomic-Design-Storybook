import { PositionPropT } from "../types";

export const positionToolT = (position: PositionPropT) => {
  switch (position) {
    case "topLeft":
      return {
        bottom: "100%",
        transform: "translateY(-10px)",
      };
    case "topRight":
      return {
        bottom: "100%",
        transform: "translateY(-10px)",
        right: "0",
      };
    case "topCenter":
      return {
        bottom: "100%",
        transform: "translate(-50% , -10px)",
        left: "50%",
      };
    case "leftTop":
      return {
        top: 0,
        transform: "translateX(-10px)",
        right: "100%",
      };
    case "leftBottom":
      return {
        bottom: "0",
        transform: "translateX(-10px)",
        right: "100%",
      };
    case "leftCenter":
      return {
        top: "50%",
        transform: "translate(-10px , -50%)",
        right: "100%",
      };
    case "bottomLeft":
      return {
        top: "100%",
        transform: "translateY(10px)",
        left: "0",
      };
    case "bottomRight":
      return {
        top: "100%",
        transform: "translateY(10px)",
        right: "0",
      };
    case "bottomCenter":
      return {
        top: "100%",
        transform: "translate(-50% , 10px)",
        left: "50%",
      };
    case "rightTop":
      return {
        top: "0",
        transform: "translateX(10px)",
        left: "100%",
      };
    case "rightBottom":
      return {
        bottom: "0",
        transform: "translateX(10px)",
        left: "100%",
      };
    case "rightCenter":
      return {
        top: "50%",
        transform: "translate(10px , -50%)",
        left: "100%",
      };
  }
};
