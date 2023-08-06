import React, { useEffect } from "react";
import {
  ACCalendarYearSelectItem,
  ACCalendarYearSelectWrap,
} from "../Styled/styled";

import { styleProp, classNamesProp } from "../Types";

let years: number[] = [];
for (let i = 1990; i < 2050; i++) {
  years.push(i);
}

export type ACCalendarYearSelectProps = {
  setYearHandle: (year: number) => void;
  style?: styleProp;
  classNames?: classNamesProp;
};

const ACCalendarYearSelect = ({
  setYearHandle,
  style,
  classNames,
}: ACCalendarYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const currentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef?.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <ACCalendarYearSelectWrap style={style?.yearSelectWrap} role={"yearPicker"}>
      {years.map((year) => (
        <ACCalendarYearSelectItem
          role={"yearSelect"}
          style={style?.yearSelect}
          key={year}
          ref={year === currentYear ? currentRef : null}
          onClick={() => setYearHandle(year)}
          className={classNames?.yearSelect}
        >
          {year}
        </ACCalendarYearSelectItem>
      ))}
    </ACCalendarYearSelectWrap>
  );
};

export default ACCalendarYearSelect;
