import React from "react";
import { ACCalendarNextPrevMonthDay } from "../Styled/styled";

export type ACCalendarNextMontDaysProps = {
  lastDayIndex: number;
  clickOnNextDay: (day: number) => void;
};
const ACCalendarNextMontDays = ({
  lastDayIndex,
  clickOnNextDay,
}: ACCalendarNextMontDaysProps) => {
  let index = lastDayIndex;

  if (lastDayIndex === 0) index = 7;

  const nextDays = [];

  for (let i = 1; i <= 7 - index; i++) {
    nextDays.push(
      <ACCalendarNextPrevMonthDay
        role={"nextDay"}
        key={i}
        onClick={() => clickOnNextDay(i)}
      >
        {i}
      </ACCalendarNextPrevMonthDay>
    );
  }
  return <>{nextDays.map((item) => item)}</>;
};

export default ACCalendarNextMontDays;
