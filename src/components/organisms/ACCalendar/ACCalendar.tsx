import React, {
  useState,
  useCallback,
  useRef,
  useReducer,
  useEffect,
} from "react";

import { calendarReducer, initialState } from "./Reducer";

import { ACInput } from "../../atoms";

import ACCalendarHeader from "./Components/ACCalendarHeader";
import ACCalendarWeekDays from "./Components/ACCalendarWeekDays";
import ACCalendarNextMontDays from "./Components/ACCalendarNextMontDays";
import ACCalendarDays from "./Components/ACCalendarDays";
import ACCalendarPrevDays from "./Components/ACCalendarPrevDays";
import ACCalendarMonthSelect from "./Components/ACCalendarMonthSelect";
import ACCalendarYearSelect from "./Components/ACCalendarYearSelect";
import ACCalendarSetTime from "./Components/ACCalendarSetTime";
import ACCalendarSetTimeDigital from "./Components/ACCalendarSetTimeDigital";

import {
  checkDateFormate,
  createStringDate,
  getIndexesAndFirsAndPrevLastDay,
  checkIsOutOfRange,
  checkTimeFormatAndReturnDateHHMM,
  checkIsDateInDisabledRange,
  checkDateFormatAndReturnDateMMDDYYYY,
} from "./Helpers";

import { BsFillCalendarDayFill } from "react-icons/bs";
import { VscClearAll } from "react-icons/vsc";
import { AiOutlineClockCircle, AiOutlineClose } from "react-icons/ai";

import { ACCalendarProps } from "./Types";

import {
  ACCalendarPicker,
  ACCalendarPickerBody,
  ACCalendarPickerContent,
  ACCalendarPickerDays,
  ACCalendarPickerFooter,
  ACCalendarWrap,
} from "./Styled/styled";
import { ACEvenType } from "../../../globalTypes";

let initial = true;

const ACCalendar = ({
  dateFormat = "DD-MM-YYYY",
  markRange,
  startDate,
  endDate,
  name,
  onBlur,
  defaultDate,
  timePicker = false,
  digitalClock = false,
  style,
  classNames,
  onChange,
  onErrorDate,
  disableWeekDays,
}: ACCalendarProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const [
    {
      currentDate,
      selectedDate,
      MM,
      YYYY,
      inputValue,
      errorDate,
      errorMessages,
      HH,
      mm,
    },
    dispatch,
  ] = useReducer(calendarReducer, initialState);

  const dataFormateObject = checkDateFormate(dateFormat, timePicker);

  let { lastDay, prevLastDay, firstDayIndex, lastDayIndex } =
    getIndexesAndFirsAndPrevLastDay(currentDate);

  if (timePicker) {
    //@ts-ignore
    dateFormat = dateFormat + " HH:MM";
  }

  useEffect(() => {
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [isFocused, selectedDate]);

  useEffect(() => {
    if (defaultDate) {
      dispatch({ type: "SET_CURRENT_DATE", payload: defaultDate });
      dispatch({ type: "SET_SELECTED_DATE", payload: defaultDate });
      dispatch({
        type: "SET_INPUT_VALUE",
        payload: createStringDate(dataFormateObject, defaultDate),
      });
    }
  }, []);

  useEffect(() => {
    if (!initial) {
      return (
        onChange &&
        onChange(selectedDate, {
          ac: { name, value: selectedDate },
        } as ACEvenType<undefined, string>)
      );
    }
    initial = false;
  }, [selectedDate]);

  useEffect(() => {
    if (!initial) {
      return onErrorDate && onErrorDate(errorDate);
    }
  }, [errorDate]);

  const nextMonthHandler = useCallback(() => {
    dispatch({ type: "NEXT_MONTH" });
  }, []);

  const prevMonthHandler = useCallback(() => {
    dispatch({ type: "PREVIOUS_MONTH" });
  }, []);

  const setMonthHandler = useCallback((month: number) => {
    dispatch({ type: "SET_MONTH", payload: month });
    setIsMonthSelectOpen(false);
  }, []);

  const setYearHandle = useCallback((year: number) => {
    dispatch({ type: "SET_YEAR", payload: year });
    setIsYearSelectOpen(false);
  }, []);

  const clickOnPrevDayHandle = useCallback(
    (day: any) => {
      if (MM === 0)
        return dispatch({
          type: "CLICK_PREV_NEXT_DAY",
          payload: new Date(YYYY - 1, 11, day),
        });

      return dispatch({
        type: "CLICK_PREV_NEXT_DAY",
        payload: new Date(YYYY, MM - 1, day),
      });
    },
    [MM, YYYY]
  );

  const clickOnNextDayHandle = useCallback(
    (day: number) => {
      if (MM === 11)
        return dispatch({
          type: "CLICK_PREV_NEXT_DAY",
          payload: new Date(YYYY + 1, 0, day),
        });

      return dispatch({
        type: "CLICK_PREV_NEXT_DAY",
        payload: new Date(YYYY, MM + 1, day),
      });
    },
    [MM, YYYY]
  );

  const onDayClickHandler = useCallback(
    (day: number) => {
      const date = new Date(YYYY, MM, day);

      if (timePicker) {
        date.setHours(HH || 0);
        date.setMinutes(mm | 0);
      }

      const inputString = createStringDate(
        dataFormateObject,
        new Date(YYYY, MM, day, HH || 0, mm || 0)
      );

      dispatch({ type: "SET_ERROR_DATE", payload: false });
      dispatch({ type: "SET_SELECTED_DATE", payload: date });
      dispatch({ type: "SET_INPUT_VALUE", payload: inputString });
      dispatch({ type: "SET_CURRENT_DATE", payload: date });

      if (!timePicker) return setIsPickerOpen(false);
      setIsTimePickerOpen(true);
    },
    [timePicker, HH, mm, YYYY, MM, dataFormateObject]
  );

  const onHourChangeHandler = useCallback((date: Date) => {
    dispatch({ type: "SET_CURRENT_DATE", payload: date });
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
    dispatch({
      type: "SET_INPUT_VALUE",
      payload: createStringDate(dataFormateObject, date),
    });
  }, []);

  const onMinuteChangeHandler = useCallback(
    (date: Date) => {
      dispatch({ type: "SET_CURRENT_DATE", payload: date });
      dispatch({
        type: "SET_INPUT_VALUE",
        payload: createStringDate(dataFormateObject, date),
      });
      dispatch({ type: "SET_SELECTED_DATE", payload: date });
      if (!digitalClock) {
        setIsPickerOpen(false);
        setIsTimePickerOpen(false);
      }
    },
    [digitalClock]
  );

  const onChangeHandler = useCallback(
    (e: any) => {
      const value = e.target.value;
      const nextIndex = value.length;
      const index = value.length - 1;

      if (value.length < inputValue.length)
        return dispatch({ type: "SET_INPUT_VALUE", payload: value });

      if (dateFormat[nextIndex] == dataFormateObject.separator) {
        return dispatch({
          type: "SET_INPUT_VALUE",
          payload: value + dataFormateObject.separator,
        });
      }
      if (timePicker) {
        if (dateFormat[nextIndex] == " ")
          return dispatch({
            type: "SET_INPUT_VALUE",
            payload: value + " ",
          });

        if (dateFormat[nextIndex] == ":")
          return dispatch({
            type: "SET_INPUT_VALUE",
            payload: value + ":",
          });
      }

      if (!dateFormat[index]) return;

      return dispatch({ type: "SET_INPUT_VALUE", payload: value });
    },
    [inputValue, dateFormat, dataFormateObject.separator, timePicker]
  );

  const openCalendarHandle = useCallback(() => {
    setIsPickerOpen((prev) => !prev);
    calendarRef.current?.focus();
  }, [calendarRef.current]);

  const inputOnBlurHandler = useCallback(() => {
    dispatch({ type: "SET_ERROR_DATE", payload: false });
    dispatch({ type: "SET_ERROR_MESSAGES", payload: "" });

    let dateInput;
    let timeInput;
    let isValidDate = true;

    const input = {
      DDInput: "",
      MMInput: "",
      YYYYInput: "",
      HHInput: "",
      MMInputTime: "",
    };

    if (inputValue.length == 0)
      return dispatch({ type: "SET_ERROR_DATE", payload: true });

    dateInput = inputValue;

    if (timePicker) {
      dateInput = inputValue.split(" ")[0];
      timeInput = inputValue.split(" ")[1];
    }

    dateInput
      .split(dataFormateObject.separator)
      .forEach((item: string, index: number) => {
        checkDateFormatAndReturnDateMMDDYYYY(
          item,
          index,
          dataFormateObject,
          dispatch,
          input
        );
      });

    const date: Date | any = new Date(
      `${input.MMInput}/${input.DDInput}/${input.YYYYInput}`
    );

    if (timePicker) {
      timeInput?.split(":").forEach((item: string, index: number) => {
        checkTimeFormatAndReturnDateHHMM(
          item,
          index,
          dataFormateObject,
          dispatch,
          input
        );
      });

      date.setHours(input.HHInput);
      date.setMinutes(input.MMInputTime);
    }

    if (date == "Invalid Date")
      return dispatch({ type: "SET_ERROR_DATE", payload: true });

    if (markRange) {
      markRange.forEach((item) => {
        if (checkIsDateInDisabledRange(item, date, dispatch))
          isValidDate = false;
      });
    }

    if (
      checkIsOutOfRange(
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        startDate,
        endDate
      )
    ) {
      isValidDate = false;
      dispatch({
        type: "SET_ERROR_MESSAGES",
        payload: "This Date Is Out Of Range",
      });
      dispatch({ type: "SET_SELECTED_DATE", payload: null });
      return dispatch({ type: "SET_ERROR_DATE", payload: true });
    }

    if (!isValidDate) return;

    dispatch({ type: "SET_SELECTED_DATE", payload: date });
    dispatch({ type: "SET_CURRENT_DATE", payload: date });
  }, [inputValue, dataFormateObject, selectedDate, markRange]);

  const closeCalendarDropDownHandler = () => {
    setIsPickerOpen(false);
    setIsMonthSelectOpen(false);
    setIsYearSelectOpen(false);
  };

  const restartCalendarHandle = () => {
    dispatch({ type: "SET_CURRENT_DATE", payload: new Date() });
    dispatch({ type: "SET_SELECTED_DATE", payload: null });
    dispatch({ type: "SET_INPUT_VALUE", payload: "" });
  };
  function handleFocus(e: any) {
    if (!isFocused && calendarRef.current?.contains(e.target))
      setIsFocused(true);

    if (isFocused && !calendarRef.current?.contains(e.target)) {
      setIsFocused(false);
      onBlur &&
        onBlur({
          ac: { name, value: selectedDate, type: "ACCalendar", event: "blur" },
        } as ACEvenType<undefined, string>);
    }
  }

  return (
    <>
      <ACCalendarWrap
        onBlur={closeCalendarDropDownHandler}
        tabIndex={1}
        ref={calendarRef}
        className={classNames?.calendar}
        role="ACCalendar"
      >
        <div>
          <ACInput
            addonAfterOnClick={openCalendarHandle}
            addonAfter={
              <BsFillCalendarDayFill
                role="calendarIcon"
                style={{ fill: "#FFF" }}
              />
            }
            onChange={onChangeHandler}
            value={inputValue}
            placeholder={dateFormat}
            onBlur={inputOnBlurHandler}
            errorMessage={errorMessages || "Invalid Date Format"}
            hasError={errorDate}
            className="ACCalendar__input"
            dataTestId="ACCalendar__input"
            style={{
              addonWrapperAfter: {
                backgroundColor: "#25566b",
                border: "1px solid #25566b",
                borderRadius: "0 5px 5px 0",
              },
              affixWrapper: {
                border: "1px solid #25566b",
                borderRadius: "5px 0 0 5px",
              },
              ...style?.input,
            }}
          />
        </div>
        <ACCalendarPicker
          role={"ACCalendar__picker"}
          isPickerOpen={isPickerOpen}
        >
          <ACCalendarPickerContent>
            {isYearSelectOpen && (
              <ACCalendarYearSelect
                style={style}
                setYearHandle={setYearHandle}
                classNames={classNames}
              />
            )}
            {isMonthSelectOpen && (
              <ACCalendarMonthSelect
                setMonthHandler={setMonthHandler}
                style={style}
                classNames={classNames}
              />
            )}
            {isTimePickerOpen && !digitalClock && (
              <ACCalendarSetTime
                currentDate={currentDate}
                onHourChange={onHourChangeHandler}
                onMinuteChange={onMinuteChangeHandler}
                style={style}
                classNames={classNames}
              />
            )}
            {isTimePickerOpen && digitalClock && (
              <ACCalendarSetTimeDigital
                currentDate={currentDate}
                onHourChange={onHourChangeHandler}
                onMinuteChange={onMinuteChangeHandler}
                style={style}
                classNames={classNames}
              />
            )}
            <ACCalendarHeader
              prevMonthHandler={prevMonthHandler}
              MM={MM}
              YYYY={YYYY}
              nextMonthHandler={nextMonthHandler}
              openMonthSelect={setIsMonthSelectOpen}
              openYearSelect={setIsYearSelectOpen}
              style={style}
              classNames={classNames}
            />
            <ACCalendarPickerBody>
              <ACCalendarWeekDays style={style} />

              <ACCalendarPickerDays>
                <ACCalendarPrevDays
                  firstDayIndex={firstDayIndex}
                  prevLastDay={prevLastDay}
                  clickOnPrevDay={clickOnPrevDayHandle}
                />
                <ACCalendarDays
                  lastDay={lastDay}
                  MM={MM}
                  YYYY={YYYY}
                  selectedDate={selectedDate}
                  onDayClick={onDayClickHandler}
                  markRange={markRange}
                  startDate={startDate}
                  endDate={endDate}
                  disableWeekDays={disableWeekDays}
                />
                <ACCalendarNextMontDays
                  lastDayIndex={lastDayIndex}
                  clickOnNextDay={clickOnNextDayHandle}
                />
              </ACCalendarPickerDays>
            </ACCalendarPickerBody>
          </ACCalendarPickerContent>
          <ACCalendarPickerFooter>
            {isMonthSelectOpen && (
              <AiOutlineClose
                onClick={() => setIsMonthSelectOpen(false)}
                className="ACCalendar__footerIcon"
              />
            )}
            {isYearSelectOpen && (
              <AiOutlineClose
                onClick={() => setIsYearSelectOpen(false)}
                className="ACCalendar__footerIcon"
              />
            )}
            {isTimePickerOpen && (
              <AiOutlineClose
                onClick={() => setIsTimePickerOpen(false)}
                className="ACCalendar__footerIcon"
              />
            )}
            {!isMonthSelectOpen && !isYearSelectOpen && !isTimePickerOpen && (
              <VscClearAll
                role={"resetButton"}
                onClick={restartCalendarHandle}
                className="clearAllIcon ACCalendar__footerIcon"
              />
            )}
            {!isMonthSelectOpen && !isYearSelectOpen && timePicker && (
              <AiOutlineClockCircle
                onClick={() => setIsTimePickerOpen(true)}
                className="clockIcon ACCalendar__footerIcon"
                role={"clockIcon"}
              />
            )}
          </ACCalendarPickerFooter>
        </ACCalendarPicker>
      </ACCalendarWrap>
    </>
  );
};

export default ACCalendar;
