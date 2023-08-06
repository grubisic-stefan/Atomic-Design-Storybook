import React, { useEffect, useRef } from "react";
import {
  infiniteMinuteScrollJumpToStart,
  scrollToStartPosition,
  setMinutesRef,
} from "./Helpers";

import { minutes } from "./Constants";
import { ACCalendarTimerWrap, ACCalendarTimeStep } from "./Styled";

export type ACDigitalMinutesPickerProps = {
  MM?: number;
  minuteSelect: (minute: number) => void;
  style?: {
    digitalMinuteWrap: React.CSSProperties;
    digitalMinute: React.CSSProperties;
  };
  className?: string;
  color?: string;
};
const ACDigitalMinutesPicker = ({
  MM,
  minuteSelect,
  style,
  className,
  color,
}: ACDigitalMinutesPickerProps) => {
  const minuteSelector = useRef<HTMLDivElement>(null);
  const minuteSelectStartPoint = useRef<HTMLDivElement>(null);

  const endDownScroll = useRef<HTMLDivElement>(null);
  const startDownScroll = useRef<HTMLDivElement>(null);

  const endUpScroll = useRef<HTMLDivElement>(null);
  const startUpScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startUpScrollRect = startUpScroll.current?.getBoundingClientRect();
    let minuteSelectorRect = minuteSelector.current?.getBoundingClientRect();
    let minuteSelectStartPointRect =
      minuteSelectStartPoint.current?.getBoundingClientRect();
    let startDownScrollRect = startDownScroll.current?.getBoundingClientRect();
    let endDownScrollRect = endDownScroll.current?.getBoundingClientRect();

    const startScrollDownPosition =
      (startDownScrollRect?.top || 0) - (minuteSelectorRect?.top || 0);
    const startScrollUpPosition =
      (startUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0);

    scrollToStartPosition(
      minuteSelector,
      minuteSelectStartPointRect,
      minuteSelectorRect,
      startUpScrollRect,
      endDownScrollRect,
      MM
    );
    minuteSelector.current?.addEventListener("scroll", () => {
      infiniteMinuteScrollJumpToStart(
        minuteSelector,
        endDownScroll,
        endUpScroll,
        startScrollDownPosition,
        minuteSelectorRect,
        startScrollUpPosition
      );
    });
  }, [minuteSelector, minuteSelectStartPoint]);

  return (
    <ACCalendarTimerWrap
      role="minuteSelectorWrap"
      style={style?.digitalMinuteWrap}
      ref={minuteSelector}
    >
      {minutes.map((minute, i) => {
        const setRef = setMinutesRef(
          minute,
          i,
          endUpScroll,
          startDownScroll,
          startUpScroll,
          endDownScroll,
          minuteSelectStartPoint,
          MM
        );
        return (
          <ACCalendarTimeStep
            role="digitalMinuteSelect"
            style={style?.digitalMinute}
            selected={minute == MM}
            onClick={() => minuteSelect(minute)}
            key={i}
            className={className}
            ref={setRef}
            color={color}
          >
            {minute.toString().length == 1 ? `0${minute}` : minute}
          </ACCalendarTimeStep>
        );
      })}
    </ACCalendarTimerWrap>
  );
};

export default ACDigitalMinutesPicker;
