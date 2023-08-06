export function infiniteMinuteScrollJumpToStart(
  minuteSelector: React.RefObject<HTMLDivElement>,

  endDownScroll: React.RefObject<HTMLDivElement>,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startScrollDownPosition: number,
  minuteSelectorRect: DOMRect | undefined,
  startScrollUpPosition: number
) {
  const endDownScrollRect = endDownScroll.current?.getBoundingClientRect();
  const endUpScrollRect = endUpScroll.current?.getBoundingClientRect();

  if (
    (endDownScrollRect?.bottom || 0) - (minuteSelectorRect?.bottom || 0) <
    16
  ) {
    return minuteSelector.current?.scrollTo({
      top:
        startScrollDownPosition -
        ((endDownScrollRect?.top || 0) - (minuteSelectorRect?.top || 0)),
    });
  }

  if ((endUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) > 16) {
    return minuteSelector.current?.scrollTo({
      top:
        startScrollUpPosition -
        ((endUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0)),
    });
  }
}

export const scrollToStartPosition = (
  minuteSelector: React.RefObject<HTMLDivElement>,
  minuteSelectStartPointRect: DOMRect | undefined,
  minuteSelectorRect: DOMRect | undefined,
  startUpScrollRect: DOMRect | undefined,
  endDownScrollRect: DOMRect | undefined,
  MM?: number
) => {
  if (MM == 1) {
    return minuteSelector.current?.scrollTo({
      top: (startUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) - 30,
    });
  }

  if (MM == 58) {
    return minuteSelector.current?.scrollTo({
      top: (endDownScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) - 30,
    });
  }

  return minuteSelector.current?.scrollTo({
    top:
      (minuteSelectStartPointRect?.top || 0) -
      (minuteSelectorRect?.top || 0) -
      30,
  });
};

export const setMinutesRef = (
  minute: number,
  i: number,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startDownScroll: React.RefObject<HTMLDivElement>,
  startUpScroll: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  minuteSelectStartPoint: React.RefObject<HTMLDivElement>,
  MM?: number
) => {
  if (i < 60) {
    if (minute === 1) {
      return endUpScroll;
    }
    if (minute === 58) {
      return startDownScroll;
    }
  }

  if (i > 59) {
    if (minute === 1) {
      return startUpScroll;
    }
    if (minute === 58) {
      return endDownScroll;
    }
  }
  if (minute == MM && i < 60 && minute !== 0) return minuteSelectStartPoint;
  if (minute == MM && i > 59 && minute == 0) return minuteSelectStartPoint;
  if (!MM && i == 60) return minuteSelectStartPoint;
};
