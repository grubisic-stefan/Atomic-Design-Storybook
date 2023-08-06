import React from "react";
import { ACCalendarWeekDay, ACCalendarWeekDaysWrap } from "../Styled/styled";

import { styleProp } from "../Types";

function ACCalendarWeekDays({ style }: { style?: styleProp }) {
  return (
    <ACCalendarWeekDaysWrap style={style?.weekDaysWrapp}>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Mon
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Tue
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Wed
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Thu
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Fri
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Sat
      </ACCalendarWeekDay>
      <ACCalendarWeekDay
        style={style?.weekDay}
        className="ACCalendar__picker__body__weekdays__day"
      >
        Sun
      </ACCalendarWeekDay>
    </ACCalendarWeekDaysWrap>
  );
}

export default ACCalendarWeekDays;
