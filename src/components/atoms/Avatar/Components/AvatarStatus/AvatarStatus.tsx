import React, { ReactElement } from "react";

import { statusPosition } from "../../Helper/helperFunctions";

import "./AvatarStatus.scss";

export type AvatarStatusPropsT = {
  status: "active" | "off" | "dnd" | "afk" | "none";
  position?: "tl" | "tr" | "bl" | "br";
  collapseBorder?: number;
  collapseColor?: string;
  collapse?: number;
  statusDotClass?: string;
  children: ReactElement;
  zIndex?: number;
  key?: string | number;
};

export default function AvatarStatus({
  collapseBorder,
  collapseColor,
  collapse,
  zIndex = 999999,
  statusDotClass,
  children,
  position,
  status,
  key,
}: AvatarStatusPropsT) {
  const statusDotPosition = () => {
    const avatarSize = children.props.size;
    if (avatarSize == "sm") {
      return statusPosition(position, 0);
    }
    if (avatarSize == "md") {
      return statusPosition(position, 3);
    }
    if (avatarSize == "lg") {
      return statusPosition(position, 5);
    }

    return statusPosition(position, 10);
  };

  const statusColor = () => {
    if (status == "active") return { backgroundColor: "#55df55" };
    if (status == "afk") return { backgroundColor: "#ffca00" };
    if (status == "dnd") return { backgroundColor: "#fb2a5f" };
    if (status == "off") return { backgroundColor: "#aaaaaa" };
    if (status == "none") return { display: "none" };
  };

  const groupStyle = {
    marginLeft: !!collapse ? collapse + "px" : undefined,
    border: `${collapseBorder}px solid ${collapseColor}`,
    zIndex,
  };

  return (
    <div
      data-testid="Avatar__status-root"
      key={key}
      style={groupStyle}
      className="Avatar__status"
    >
      {children}

      <div
        data-testid="Avatar__status-dot"
        style={{ ...statusDotPosition(), ...statusColor() }}
        className={statusDotClass + " Avatar__status-dot " + status || ""}
      ></div>
    </div>
  );
}
