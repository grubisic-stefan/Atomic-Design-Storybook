import React from "react";

import { classNamesProp, styleProp } from "../Types";

import { Month } from "../Constants";
import { ACCalendarMonthField, ACCalendarMonthsWrap } from "../Styled/styled";

const monthsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export type ACCalendarMonthSelectProps = {
  setMonthHandler: (month: number) => void;
  style?: styleProp;
  classNames?: classNamesProp;
};

function ACCalendarMonthSelect({
  setMonthHandler,
  style,
  classNames,
}: ACCalendarMonthSelectProps) {
  return (
    <>
      <ACCalendarMonthsWrap role={"monthPicker"} style={style?.monthSelectWrap}>
        {monthsArr.map((month, i) => {
          return (
            <ACCalendarMonthField
              role={"monthSelect"}
              style={style?.monthSelect}
              onClick={() => setMonthHandler(month)}
              className={classNames?.mountSelect}
              key={i}
            >
              {Month[month]}
            </ACCalendarMonthField>
          );
        })}
      </ACCalendarMonthsWrap>
    </>
  );
}

export default ACCalendarMonthSelect;
