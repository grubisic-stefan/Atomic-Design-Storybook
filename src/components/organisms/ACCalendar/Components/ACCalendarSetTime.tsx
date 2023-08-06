import React from "react";
import {
  ACCalendarClockBigHandle,
  ACCalendarClockDot,
  ACCalendarClockSmallHandle,
  ACCalendarClockWrap,
  ACCalendarMinuteDot,
  ACCalendarSetTimeWrap,
  BigNumberWrap,
  SmallNumberWrap,
} from "../Styled/styled";

import { classNamesProp, styleProp } from "../Types";

export type ACCalendarSetTimeProps = {
  currentDate: Date;
  onHourChange: (date: Date) => void;
  onMinuteChange: (date: Date) => void;
  style?: styleProp;
  classNames?: classNamesProp;
};

const hourSmall = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const hourBig = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const minutes = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const ACCalendarSetTime = ({
  currentDate,
  onHourChange,
  onMinuteChange,
  style,
  classNames,
}: ACCalendarSetTimeProps) => {
  const [handleAngle, setHandleAngle] = React.useState(0);
  const [showBigHandle, setShowBigHandle] = React.useState(false);
  const [showSmallHandle, setShowSmallHandle] = React.useState(false);
  const [selectMinutes, setSelectMinutes] = React.useState(false);

  const smallNumberHoverHandler = (angle: number) => {
    setHandleAngle(angle);
    setShowBigHandle(true);
  };
  const smallNumberLeaveHandler = () => {
    setShowBigHandle(false);
  };

  const bigNumberHoverHandler = (angle: number) => {
    setShowSmallHandle(true);
    setHandleAngle(angle);
  };

  const bigNumberLeaveHandler = () => {
    setShowSmallHandle(false);
  };

  const onHourChangeHandler = (hour: number) => {
    setSelectMinutes(true);
    const newDate = new Date(currentDate);
    newDate.setHours(hour);
    onHourChange(newDate);
  };

  const onMinutesChangeHandler = (minutes: number) => {
    const newDate = new Date(currentDate);
    newDate.setMinutes(minutes);
    onMinuteChange(newDate);
  };

  return (
    <ACCalendarSetTimeWrap
      style={style?.setTimeWrap}
      className="ACCalendar__picker-set-time"
    >
      {!selectMinutes && (
        <ACCalendarClockWrap role="clockPicker" style={style?.clockRing}>
          <ACCalendarClockDot
            style={style?.clockDot}
            className="clockPoint"
          ></ACCalendarClockDot>
          {hourSmall.map((item, index) => {
            const angle = (index * 30) % 360;
            return (
              <SmallNumberWrap
                key={item}
                role="hourSelectSmallNumber"
                onClick={() => onHourChangeHandler(item)}
                onMouseEnter={() => smallNumberHoverHandler(angle)}
                onMouseLeave={smallNumberLeaveHandler}
                style={{
                  ...style?.clockNumber,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
                className={classNames?.clockNumber}
              >
                <div style={{ transform: `rotate(-${angle}deg)` }}>
                  {item === 0 ? "00" : item}
                </div>
              </SmallNumberWrap>
            );
          })}
          {hourBig.map((item, index) => {
            const angle = (index * 30) % 360;
            return (
              <BigNumberWrap
                key={item}
                role="hourSelectBigNumber"
                onMouseEnter={() => bigNumberHoverHandler(angle)}
                onMouseLeave={bigNumberLeaveHandler}
                style={{
                  ...style?.clockNumber,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
                className={classNames?.clockNumber}
                onClick={() => onHourChangeHandler(item)}
              >
                <div style={{ transform: `rotate(-${angle}deg)` }}>{item}</div>
              </BigNumberWrap>
            );
          })}
          {showBigHandle && (
            <ACCalendarClockBigHandle
              role="bigHandle"
              style={{
                ...style?.bigHandle,
                transform: `rotate(${handleAngle || 0}deg) translate(-50%, 0)`,
              }}
            ></ACCalendarClockBigHandle>
          )}
          {showSmallHandle && (
            <ACCalendarClockSmallHandle
              role="smallHandle"
              style={{
                ...style?.smallHandle,
                transform: `rotate(${handleAngle || 0}deg) translate(-50%, 0)`,
              }}
              className="smallHandle"
            ></ACCalendarClockSmallHandle>
          )}
        </ACCalendarClockWrap>
      )}
      {selectMinutes && (
        <ACCalendarClockWrap style={style?.clockRing}>
          <ACCalendarClockDot style={style?.clockDot} />
          {minutes.map((item, index) => {
            const angle = (index * 6) % 360;
            return (
              <SmallNumberWrap
                key={item}
                role={`minutesSelect`}
                onClick={() => onMinutesChangeHandler(item)}
                onMouseEnter={() => smallNumberHoverHandler(angle)}
                onMouseLeave={smallNumberLeaveHandler}
                style={{
                  ...style?.clockNumber,
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                }}
                className={classNames?.clockNumber}
              >
                <div
                  className="minutes-wrap"
                  style={{ transform: `rotate(-${angle}deg)` }}
                >
                  {item % 5 == 0 ? item : <ACCalendarMinuteDot />}
                </div>
              </SmallNumberWrap>
            );
          })}
          {showBigHandle && (
            <ACCalendarClockBigHandle
              style={{
                ...style?.bigHandle,
                transform: `rotate(${handleAngle || 0}deg) translate(-50%, 0)`,
              }}
            ></ACCalendarClockBigHandle>
          )}
        </ACCalendarClockWrap>
      )}
    </ACCalendarSetTimeWrap>
  );
};

export default ACCalendarSetTime;
