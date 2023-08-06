import React, { ReactElement } from "react";

import {
  AvatarCustomSizeType,
  radiusConverter,
  sizeConverter,
} from "./Helper/helperFunctions";

import "./Avatar.scss";

type AvatarProps = {
  children?: ReactElement | string;
  imgUrl?: string;
  img?: any;
  bgColor?: string;
  color?: string;
  size?: "md" | "sm" | "lg" | AvatarCustomSizeType;
  type?: "square" | "circle";
  rounded?: "0" | "sm" | "md" | "lg" | "full" | number;
  collapse?: number;
  collapseBorder?: number;
  collapseColor?: string;
  zIndex?: number;
  className?: string;
  hoverEffect?: boolean;

  onClick?: () => any;
};

const Avatar = ({
  children,
  imgUrl,
  img,
  bgColor,
  color = "#FFF",
  size = "sm",
  type = "circle",
  rounded = "sm",
  collapse,
  collapseBorder,
  collapseColor,
  zIndex = 999999,
  className = "",
  hoverEffect = false,
  onClick,
}: AvatarProps) => {
  const avatarImg = () => {
    if (img) return <img alt="UserImg" className="Avatar__img" src={img} />;
    if (imgUrl)
      return <img alt="UserImg" className="Avatar__img" src={imgUrl} />;

    return <p>AC</p>;
  };

  const groupStyle = () => {
    return {
      marginLeft: !!collapse ? collapse + "px" : undefined,
      border: `${collapseBorder}px solid ${collapseColor}`,
      zIndex,
    };
  };

  const style = {
    backgroundColor: bgColor || undefined,
    ...sizeConverter(size),
    borderRadius: type == "circle" ? "50%" : radiusConverter(rounded),
    ...groupStyle(),
  };

  return (
    <div
      data-testid="avatar__root"
      style={style}
      className={`Avatar  + ${className} ${hoverEffect ? "hoverEffect" : ""}`}
      onClick={onClick}
    >
      {children ? (
        <p data-testid="avatar__letter" style={{ color }}>
          {children}
        </p>
      ) : (
        avatarImg()
      )}
    </div>
  );
};

export default Avatar;
