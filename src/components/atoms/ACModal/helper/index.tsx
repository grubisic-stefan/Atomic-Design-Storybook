export const transitionType = (
  transition: "fade" | "fromTop" | "fromBottom"
) => {
  if (transition == "fade")
    return {
      inStart: "opacityInStart",
      inEnd: "opacityInEnd",
      outStart: "opacityOutStart",
      outEnd: "opacityOuEnd",
    };
  if (transition == "fromTop")
    return {
      inStart: "fromTopInStart",
      inEnd: "fromTopInEnd",
      outStart: "fromTopOutStart",
      outEnd: "fromTopOuEnd",
    };
  return {
    inStart: "fromBottomInStart",
    inEnd: "fromBottomInEnd",
    outStart: "fromBottomOutStart",
    outEnd: "fromBottomOuEnd",
  };
};
