export type AvatarCustomSizeType = {
  width: number;
  height: number;
};

export const sizeConverter = (
  size: "sm" | "md" | "lg" | AvatarCustomSizeType
) => {
  if (size === "sm")
    return {
      width: "30px",
      height: "30px",
    };
  if (size === "md")
    return {
      width: "40px",
      height: "40px",
    };
  if (size === "lg")
    return {
      width: "50px",
      height: "50px",
    };
  return size;
};

export const statusPosition = (
  position: string | undefined,
  positionValue: number
) => {
  switch (position) {
    case "tl":
      return { left: positionValue + "%", top: positionValue + "%" };
    case "tr":
      return { right: positionValue + "%", top: positionValue + "%" };
    case "bl":
      return { left: positionValue + "%", bottom: positionValue + "%" };
    default:
      return { right: positionValue + "%", bottom: positionValue + "%" };
  }
};
export const radiusConverter = (
  radius: "0" | "sm" | "md" | "lg" | "full" | number
) => {
  if (radius == "0") return "none";
  if (radius == "sm") return "4px";
  if (radius == "md") return "8px";
  if (radius == "lg") return "16px";
  if (radius == "full") return "100%";

  return radius + "px";
};
