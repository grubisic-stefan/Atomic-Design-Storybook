import React from "react";

import { Month } from "../Constants";
import {
  ACCalendarCurrentMonth,
  ACCalendarHeaderYear,
  ACCalendarMonthArrow,
  ACCalendarPickerHeader,
  ACCalendarPickerHeaderTitle,
} from "../Styled/styled";

import { classNamesProp, styleProp } from "../Types";

export type ACCalendarHeaderProps = {
  prevMonthHandler: () => void;
  MM: number;
  nextMonthHandler: () => void;
  YYYY: number;
  openMonthSelect: (prev: any) => void;
  openYearSelect: (prev: any) => void;
  style?: styleProp;
  classNames?: classNamesProp;
};

const ACCalendarHeader = ({
  prevMonthHandler,
  MM,
  nextMonthHandler,
  YYYY,
  openMonthSelect,
  openYearSelect,
  style,
  classNames,
}: ACCalendarHeaderProps) => {
  return (
    <ACCalendarPickerHeader
      style={style?.headerWrap}
      className={classNames?.header}
    >
      <ACCalendarPickerHeaderTitle>
        <ACCalendarMonthArrow onClick={prevMonthHandler} role="prevMonth">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
              fill="#1A1A1A"
            />
          </svg>
        </ACCalendarMonthArrow>
        <ACCalendarCurrentMonth
          onClick={() => openMonthSelect((prev: any) => !prev)}
          className="ACCalendar__picker__header__month__current"
          style={style?.headerMonth}
        >
          {Month[MM]}
        </ACCalendarCurrentMonth>

        <ACCalendarMonthArrow onClick={nextMonthHandler} role="nextMonth">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59 7.91L13.17 12.5L8.59 17.09L10 18.5L16 12.5L10 6.5L8.59 7.91Z"
              fill="#1A1A1A"
            />
          </svg>
        </ACCalendarMonthArrow>
      </ACCalendarPickerHeaderTitle>
      <ACCalendarHeaderYear
        onClick={() => openYearSelect((prev: any) => !prev)}
        style={style?.headerYear}
      >
        {YYYY}
      </ACCalendarHeaderYear>
    </ACCalendarPickerHeader>
  );
};

export default ACCalendarHeader;
