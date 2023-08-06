import React from "react";
import { ACCalendarNextPrevMonthDay } from "../Styled/styled";

export type ACCalendarPrevDaysProps = {
  firstDayIndex: number;
  prevLastDay: number;
  clickOnPrevDay: (day: number) => void;
};

const ACCalendarPrevDays = ({
  firstDayIndex,
  prevLastDay,
  clickOnPrevDay,
}: ACCalendarPrevDaysProps) => {
  const prevDays = [];

  if (firstDayIndex === 0) firstDayIndex = 7;

  for (let i = firstDayIndex - 1; i > 0; i--) {
    const day = prevLastDay - i + 1;
    prevDays.push(
      <ACCalendarNextPrevMonthDay
        role={"prevDay"}
        key={day}
        onClick={() => clickOnPrevDay(day)}
        className="ACCalendar__picker__body__days__day day-prev"
      >
        {day}
      </ACCalendarNextPrevMonthDay>
    );
  }

  return <>{prevDays.map((item) => item)}</>;
};

export default ACCalendarPrevDays;
