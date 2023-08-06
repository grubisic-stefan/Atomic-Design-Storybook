import React, { useCallback } from "react";

import ACCalendarDigitalHourPicker from "./ACCalendarDigitalHourPicker";
import ACCalendarDigitalMinutePicker from "./ACCalendarDigitalMinutePicker";

import { classNamesProp, styleProp } from "../Types";
import {
  ACCalendarDigitalTimePicker,
  ACCalendarSetTimeWrap,
  ACCalendarTimeSeparator,
} from "../Styled/styled";

export type ACCalendarSetTimeProps = {
  currentDate: Date;
  onHourChange: (date: Date) => void;
  onMinuteChange: (date: Date) => void;
  style?: styleProp;
  classNames?: classNamesProp;
};
const ACCalendarSetTimeDigital = ({
  currentDate,
  onHourChange,
  onMinuteChange,
  style,
  classNames,
}: ACCalendarSetTimeProps) => {
  const HH = currentDate.getHours();
  const MM = currentDate.getMinutes();

  const onHourChangeHandle = useCallback(
    (hour: number) => {
      const newDate = new Date(currentDate);

      newDate.setHours(hour);
      onHourChange(newDate);
    },
    [currentDate]
  );

  const onMinuteChangeHandle = useCallback(
    (minute: number) => {
      const newDate = new Date(currentDate);
      newDate.setMinutes(minute);
      onMinuteChange(newDate);
    },
    [currentDate]
  );

  return (
    <ACCalendarSetTimeWrap style={style?.setTimeWrap}>
      <ACCalendarDigitalTimePicker
        role={"digitalTimePicker"}
        style={style?.digitalTimeWrap}
      >
        <ACCalendarDigitalHourPicker
          style={style}
          classNames={classNames}
          hourSelect={onHourChangeHandle}
          HH={HH}
        />
        <ACCalendarTimeSeparator>:</ACCalendarTimeSeparator>
        <ACCalendarDigitalMinutePicker
          style={style}
          classNames={classNames}
          minuteSelect={onMinuteChangeHandle}
          MM={MM}
        />
      </ACCalendarDigitalTimePicker>
    </ACCalendarSetTimeWrap>
  );
};

export default ACCalendarSetTimeDigital;
