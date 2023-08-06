import React, { memo, useMemo } from "react";

import {
  checkIsCurrentDay,
  checkIsSelectedDay,
  checkIsOutOfRange,
  checkIsDisabledWeekDay,
} from "../Helpers";
import { ACCalendarDay } from "../Styled/styled";

import { markRangeType } from "../Types";

export type ACCalendarDaysProps = {
  lastDay: number;
  MM: number;
  YYYY: number;
  selectedDate: Date | null;
  onDayClick: (day: number) => void;
  markRange?: markRangeType[];
  startDate?: Date;
  endDate?: Date;
  disableWeekDays?: { day: number; style: React.CSSProperties }[];
};

const ACCalendarDays = ({
  lastDay,
  MM,
  YYYY,
  selectedDate,
  onDayClick,
  markRange,
  startDate,
  endDate,
  disableWeekDays,
}: ACCalendarDaysProps) => {
  const markDays = () => {
    const markDays: {
      [key: number]: {
        style?: React.CSSProperties;
        label?: string;
        disabled?: boolean;
      };
    } = {};

    markRange?.map((mark) => {
      if (mark.year === YYYY && mark.month - 1 === MM) {
        mark.days.forEach((day: number) => {
          markDays[day] = {
            style: mark.style,
            label: mark.label,
            disabled: mark.disabled,
          };
        });
      }
    });
    return markDays;
  };
  const days = useMemo(() => {
    const daysArray = [];

    for (let i = 1; i <= lastDay; i++) {
      const isDisabled = checkIsDisabledWeekDay(disableWeekDays, YYYY, MM, i);
      const isCurrentDay = checkIsCurrentDay(i, MM, YYYY);
      const isMarkedDay = markDays()[i];
      const isOutOfRange = checkIsOutOfRange(i, MM, YYYY, startDate, endDate);
      const isSelectedDay = checkIsSelectedDay(i, MM, YYYY, selectedDate);
      daysArray.push(
        <ACCalendarDay
          role={"day"}
          isCurrentDay={isCurrentDay}
          isSelectedDay={isSelectedDay}
          key={i}
          onClick={() => {
            if (markDays()[i]?.disabled || isOutOfRange || isDisabled) return;
            onDayClick(i);
          }}
          style={{
            opacity: isOutOfRange ? 0.5 : 1,
            ...isDisabled?.style,
            ...isMarkedDay?.style,
          }}
        >
          {i}
        </ACCalendarDay>
      );
    }
    return daysArray;
  }, [
    lastDay,
    MM,
    YYYY,
    selectedDate,
    markRange,
    startDate,
    endDate,
    disableWeekDays,
  ]);

  return <>{days.map((item) => item)}</>;
};

export default memo(ACCalendarDays);
