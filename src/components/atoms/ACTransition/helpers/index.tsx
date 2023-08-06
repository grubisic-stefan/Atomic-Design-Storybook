export const removeInStartAndAddInEndClass = (
  el: Element | null,
  inStart: string,
  inEnd: string
) => {
  el?.classList.remove(inStart);
  el?.classList.add(inEnd);
};
export const removeOutEndAndAddInEndClass = (
  el: Element | null,
  inEnd: string,
  outEnd: string
) => {
  el?.classList.add(inEnd);
  el?.classList.remove(outEnd);
};
export const removeInEndAndAddOutStartClass = (
  el: Element | null,
  outStart: string,
  inEnd: string
) => {
  el?.classList.add(outStart);
  el?.classList.remove(inEnd);
};
export const removeOutStartAndAddOutEndClass = (
  el: Element | null,
  outStart: string,
  outEnd: string
) => {
  el?.classList.add(outEnd);
  el?.classList.remove(outStart);
};

export const getInEndClass = (forwardRef: any, height: number) => {
  if (
    forwardRef.current.getBoundingClientRect()?.top + height >
    window.innerHeight
  )
    return "dropDown--Opened-up";
  return "dropDown--Opened";
};

export const getOutEndClass = (forwardRef: any, height: number) => {
  if (
    forwardRef.current.getBoundingClientRect()?.top + height >
    window.innerHeight
  )
    return "dropDown--closed-up";
  return "dropDown--closed";
};

export const getInStartClass = (forwardRef: any, height: number) => {
  if (
    forwardRef.current.getBoundingClientRect()?.top + height >
    window.innerHeight
  )
    return "dropDown--startOpening-up";
  return "dropDown--startOpening";
};

export const getOutStartClass = (forwardRef: any, height: number) => {
  if (
    forwardRef.current.getBoundingClientRect()?.top + height >
    window.innerHeight
  )
    return "dropDown--startClosing-up";
  return "dropDown--startClosing";
};
