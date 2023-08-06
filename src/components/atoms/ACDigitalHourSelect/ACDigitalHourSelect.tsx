import React, { useEffect, useRef } from "react";

import {
  infiniteHourScrollJumpToStart,
  scrollToStartPositionHour,
  setHoursRef,
} from "./Helpers";
import { ACCalendarTimeStep, ACCalendarTimerWrap } from "./Styled";
import { color } from "../../../utils/_globalVariables";

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23,
];

export type ACDigitalHourSelectProps = {
  HH?: number;
  hourSelect: (hour: number) => void;
  style?: {
    digitalHourWrap?: React.CSSProperties;
    digitalHour?: React.CSSProperties;
  };
  className?: string;
  color?: string;
};

const ACDigitalHourSelect = ({
  HH,
  hourSelect,
  style,
  className,
  color,
}: ACDigitalHourSelectProps) => {
  const hourSelector = useRef<HTMLDivElement>(null);
  const hourSelectStartPoint = useRef<HTMLDivElement>(null);

  const endDownScroll = useRef<HTMLDivElement>(null);
  const startDownScroll = useRef<HTMLDivElement>(null);

  const endUpScroll = useRef<HTMLDivElement>(null);
  const startUpScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startUpScrollRect = startUpScroll.current?.getBoundingClientRect();
    let hourSelectorRect = hourSelector.current?.getBoundingClientRect();
    let hourSelectStartPointRect =
      hourSelectStartPoint.current?.getBoundingClientRect();
    let startDownScrollRect = startDownScroll.current?.getBoundingClientRect();
    let endDownScrollRect = endDownScroll.current?.getBoundingClientRect();

    const startScrollDownPosition =
      (startDownScrollRect?.top || 0) - (hourSelectorRect?.top || 0);
    const startScrollUpPosition =
      (startUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0);

    scrollToStartPositionHour(
      hourSelector,
      hourSelectStartPointRect,
      hourSelectorRect,
      startUpScrollRect,
      endDownScrollRect,
      HH
    );

    hourSelector.current?.addEventListener("scroll", (e) => {
      infiniteHourScrollJumpToStart(
        hourSelector,
        endDownScroll,
        endUpScroll,
        startScrollDownPosition,
        hourSelectorRect,
        startScrollUpPosition
      );
    });
  }, [hourSelector, hourSelectStartPoint]);

  return (
    <ACCalendarTimerWrap
      role="hourSelectorWrap"
      ref={hourSelector}
      style={style?.digitalHourWrap}
    >
      {hours.map((hour, i) => {
        const setRef = setHoursRef(
          hour,
          i,
          endUpScroll,
          startDownScroll,
          startUpScroll,
          endDownScroll,
          hourSelectStartPoint,
          HH
        );
        return (
          <ACCalendarTimeStep
            role="digitalHourSelect"
            style={style?.digitalHour}
            onClick={() => hourSelect(hour)}
            key={i}
            selected={hour == HH}
            className={className}
            ref={setRef}
            color={color}
          >
            {hour.toString().length == 1 ? `0${hour}` : hour}
          </ACCalendarTimeStep>
        );
      })}
    </ACCalendarTimerWrap>
  );
};

export default ACDigitalHourSelect;
