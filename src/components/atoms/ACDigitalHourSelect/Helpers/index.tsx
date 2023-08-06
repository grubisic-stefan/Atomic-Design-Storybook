export function infiniteHourScrollJumpToStart(
  hourSelector: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startScrollDownPosition: number,
  hourSelectorRect: DOMRect | undefined,
  startScrollUpPosition: number
) {
  const endDownScrollRect = endDownScroll.current?.getBoundingClientRect();
  const endUpScrollRect = endUpScroll.current?.getBoundingClientRect();
  if ((endDownScrollRect?.bottom || 0) - (hourSelectorRect?.bottom || 0) < 16) {
    hourSelector.current?.scrollTo({
      top:
        startScrollDownPosition -
        ((endDownScrollRect?.top || 0) - (hourSelectorRect?.top || 0)),
    });
  }

  if ((endUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0) > 16) {
    hourSelector.current?.scrollTo({
      top:
        startScrollUpPosition -
        ((endUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0)),
    });
  }
}

export const scrollToStartPositionHour = (
  hourSelector: React.RefObject<HTMLDivElement>,
  hourSelectStartPointRect: DOMRect | undefined,
  hourSelectorRect: DOMRect | undefined,
  startUpScrollRect: DOMRect | undefined,
  endDownScrollRect: DOMRect | undefined,
  HH?: number
) => {
  if (HH == 1) {
    return hourSelector.current?.scrollTo({
      top: (startUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
    });
  }
  if (HH == 22) {
    return hourSelector.current?.scrollTo({
      top: (endDownScrollRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
    });
  }

  return hourSelector.current?.scrollTo({
    top:
      (hourSelectStartPointRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
  });
};

export const setHoursRef = (
  hour: number,
  i: number,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startDownScroll: React.RefObject<HTMLDivElement>,
  startUpScroll: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  hourSelectStartPoint: React.RefObject<HTMLDivElement>,
  HH?: number
) => {
  if (i < 24) {
    if (hour === 1) {
      return endUpScroll;
    }
    if (hour === 22) {
      return startDownScroll;
    }
  }

  if (i > 23) {
    if (hour === 1) {
      return startUpScroll;
    }
    if (hour === 22) {
      return endDownScroll;
    }
  }

  if (hour == HH && i < 24 && hour !== 0) return hourSelectStartPoint;
  if (hour == HH && i > 23 && hour == 0) return hourSelectStartPoint;
  if (!HH && i == 24) return hourSelectStartPoint;
};
