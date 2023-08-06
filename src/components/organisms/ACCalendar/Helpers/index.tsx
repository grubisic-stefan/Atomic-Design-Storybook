import { CSSProperties } from "react";

export const checkDateFormateSeparator = (dateFormat: string) => {
  if (dateFormat.includes("-")) return "-";
  if (dateFormat.includes("/")) return "/";
  if (dateFormat.includes(".")) return ".";
  return "";
};
export const checkDateFormate = (dateFormat: string, timePicker: boolean) => {
  let splitDate = dateFormat;
  let timeFormat = null;
  if (timePicker) {
    splitDate = dateFormat.split(" ")[0];
    timeFormat = ["HH", "MM"];
  }
  const separator = checkDateFormateSeparator(dateFormat);
  const dateFormateArray = splitDate.split(separator);
  return {
    dateFormat: dateFormateArray,
    separator: separator,
    timeFormat,
  };
};

export const getIndexesAndFirsAndPrevLastDay = (date: Date) => {
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const firstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  return {
    lastDayIndex,
    firstDayIndex,
    lastDay,
    prevLastDay,
  };
};

export const createStringDate = (dateFormatObject: any, date: Date) => {
  let inputString = "";
  const { dateFormat, separator, timeFormat } = dateFormatObject;
  const MM = date.getMonth();
  const YYYY = date.getFullYear();
  const day = date.getDate();

  if (dateFormat[0] === "DD") {
    inputString = day < 10 ? `0${day}` : `${day}`;
  } else if (dateFormat[0] === "MM") {
    inputString = MM < 9 ? `0${MM + 1}` : `${MM + 1}`;
  } else if (dateFormat[0] === "YYYY") {
    inputString = `${YYYY}`;
  }

  if (dateFormat[1] === "DD") {
    const dayString = day < 10 ? `0${day}` : `${day}`;
    inputString = `${inputString}${separator}${dayString}`;
  } else if (dateFormat[1] === "MM") {
    const monthString = MM < 9 ? `0${MM + 1}` : `${MM + 1}`;
    inputString = `${inputString}${separator}${monthString}`;
  } else if (dateFormat[1] === "YYYY") {
    inputString = `${inputString}${separator}${YYYY}`;
  }

  if (dateFormat[2] === "DD") {
    const dayString = day < 10 ? `0${day}` : `${day}`;
    inputString = `${inputString}${separator}${dayString}`;
  } else if (dateFormat[2] === "MM") {
    const monthString = MM < 9 ? `0${MM + 1}` : `${MM + 1}`;
    inputString = `${inputString}${separator}${monthString}`;
  } else if (dateFormat[2] === "YYYY") {
    inputString = `${inputString}${separator}${YYYY}`;
  }

  if (timeFormat) {
    const HH = date.getHours();
    const MM = date.getMinutes();

    const HHstring = HH < 10 ? `0${HH}` : `${HH}`;
    const MMstring = MM < 10 ? `0${MM}` : `${MM}`;

    inputString = `${inputString} ${HHstring}`;

    inputString = `${inputString}:${MMstring}`;
  }

  return inputString;
};

export const checkIsCurrentDay = (day: number, MM: number, YYYY: number) => {
  const currentDate = new Date();
  if (
    day === currentDate.getDate() &&
    MM === currentDate.getMonth() &&
    YYYY === currentDate.getFullYear()
  ) {
    return true;
  }
  return false;
};

export const checkIsSelectedDay = (
  day: number,
  MM: number,
  YYYY: number,
  selectedDate?: Date | null
) => {
  if (
    day === selectedDate?.getDate() &&
    MM === selectedDate?.getMonth() &&
    YYYY === selectedDate?.getFullYear()
  ) {
    return true;
  }
  return false;
};

export const checkIsOutOfRange = (
  day: number,
  MM: number,
  YYYY: number,
  minDate?: Date,
  maxDate?: Date
) => {
  const date = new Date(YYYY, MM, day);
  if (minDate && date < minDate) {
    return true;
  }
  if (maxDate && date > maxDate) {
    return true;
  }
  return false;
};

export const checkIsDayInRange = (
  dayRange: {
    year?: number;
    month?: number;
    days?: number[];
    disabled?: boolean;
    label?: string;
    style?: CSSProperties;
  },
  selectedDate: Date
) => {
  if (
    dayRange.year === selectedDate?.getFullYear() &&
    dayRange.month === selectedDate?.getMonth() + 1 &&
    dayRange.days?.includes(selectedDate?.getDate())
  ) {
    return true;
  }
  return false;
};

export type dateFormatObjectTypes = {
  dateFormat: string[];
  separator: string;
  timeFormat?: string[] | null;
};

export const checkDateFormatAndReturnDateMMDDYYYY = (
  item: string,
  index: number,
  dataFormateObject: dateFormatObjectTypes | null,
  dispatch: React.Dispatch<any>,
  input: any
) => {
  if (item.length != dataFormateObject?.dateFormat[index].length) {
    return dispatch({ type: "SET_ERROR_DATE", payload: true });
  }
  if (dataFormateObject?.dateFormat[index].toLocaleLowerCase() == "mm") {
    if (parseInt(item) > 12)
      return dispatch({ type: "SET_ERROR_DATE", payload: true });
    input.MMInput = item;
  }
  if (dataFormateObject?.dateFormat[index].toLocaleLowerCase() == "dd") {
    if (parseInt(item) > 31)
      return dispatch({ type: "SET_ERROR_DATE", payload: true });
    input.DDInput = item;
  }
  if (dataFormateObject?.dateFormat[index].toLocaleLowerCase() == "yyyy") {
    input.YYYYInput = item;
  }
};

export const checkTimeFormatAndReturnDateHHMM = (
  item: string,
  index: number,
  dataFormateObject: dateFormatObjectTypes | null,
  dispatch: React.Dispatch<any>,
  input: any
) => {
  // @ts-ignore
  if (item.length != dataFormateObject?.timeFormat[index]?.length) {
    dispatch({
      type: "SET_ERROR_MESSAGES",
      payload: "Invalid time format",
    });
    return dispatch({ type: "SET_ERROR_DATE", payload: true });
  }

  if (dataFormateObject?.timeFormat[index].toLocaleLowerCase() == "hh") {
    if (parseInt(item) > 23) {
      dispatch({
        type: "SET_ERROR_MESSAGES",
        payload: "Invalid time format",
      });
      return dispatch({ type: "SET_ERROR_DATE", payload: true });
    }
    input.HHInput = item;
  }

  if (dataFormateObject?.timeFormat[index].toLocaleLowerCase() == "mm") {
    input.MMInputTime = item;
    if (parseInt(item) > 59) {
      dispatch({
        type: "SET_ERROR_MESSAGES",
        payload: "Invalid time format",
      });
      return dispatch({ type: "SET_ERROR_DATE", payload: true });
    }
  }
};

export const checkIsDateInDisabledRange = (
  item: any,
  date: Date,
  dispatch: React.Dispatch<any>
) => {
  if (item.disabled) {
    if (checkIsDayInRange(item, date)) {
      dispatch({
        type: "SET_ERROR_MESSAGES",
        payload: "This Date Is Disable",
      });
      dispatch({ type: "SET_SELECTED_DATE", payload: null });
      dispatch({ type: "SET_ERROR_DATE", payload: true });
      return true;
    }
  }
  return false;
};

export const checkIsDisabledWeekDay = (
  disableWeekDays: { day: number; style: React.CSSProperties }[] | undefined,
  YYYY: number,
  MM: number,
  i: number
) => {
  if (disableWeekDays) {
    return disableWeekDays.find(
      (day) => day.day === new Date(YYYY, MM, i).getDay()
    );
  }
};

export const setHoursRef = (
  hour: number,
  i: number,
  HH: number,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startDownScroll: React.RefObject<HTMLDivElement>,
  startUpScroll: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  hourSelectStartPoint: React.RefObject<HTMLDivElement>
) => {
  if (i < 24) {
    if (hour === 1) {
      return endUpScroll;
    }
    if (hour === 22) {
      return startDownScroll;
    }
  }

  if (i > 23) {
    if (hour === 1) {
      return startUpScroll;
    }
    if (hour === 22) {
      return endDownScroll;
    }
  }
  if (hour == HH) return hourSelectStartPoint;
};

export const setMinutesRef = (
  minute: number,
  i: number,
  MM: number,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startDownScroll: React.RefObject<HTMLDivElement>,
  startUpScroll: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  minuteSelectStartPoint: React.RefObject<HTMLDivElement>
) => {
  if (i < 60) {
    if (minute === 1) {
      return endUpScroll;
    }
    if (minute === 58) {
      return startDownScroll;
    }
  }

  if (i > 59) {
    if (minute === 1) {
      return startUpScroll;
    }
    if (minute === 58) {
      return endDownScroll;
    }
  }
  if (minute == MM) return minuteSelectStartPoint;
};

export function infiniteMinuteScrollJumpToStart(
  minuteSelector: React.RefObject<HTMLDivElement>,

  endDownScroll: React.RefObject<HTMLDivElement>,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startScrollDownPosition: number,
  minuteSelectorRect: DOMRect | undefined,
  startScrollUpPosition: number
) {
  const endDownScrollRect = endDownScroll.current?.getBoundingClientRect();
  const endUpScrollRect = endUpScroll.current?.getBoundingClientRect();

  if (
    (endDownScrollRect?.bottom || 0) - (minuteSelectorRect?.bottom || 0) <
    16
  ) {
    return minuteSelector.current?.scrollTo({
      top:
        startScrollDownPosition -
        ((endDownScrollRect?.top || 0) - (minuteSelectorRect?.top || 0)),
    });
  }

  if ((endUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) > 16) {
    return minuteSelector.current?.scrollTo({
      top:
        startScrollUpPosition -
        ((endUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0)),
    });
  }
}

export function infiniteHourScrollJumpToStart(
  hourSelector: React.RefObject<HTMLDivElement>,
  endDownScroll: React.RefObject<HTMLDivElement>,
  endUpScroll: React.RefObject<HTMLDivElement>,
  startScrollDownPosition: number,
  hourSelectorRect: DOMRect | undefined,
  startScrollUpPosition: number
) {
  const endDownScrollRect = endDownScroll.current?.getBoundingClientRect();
  const endUpScrollRect = endUpScroll.current?.getBoundingClientRect();
  if ((endDownScrollRect?.bottom || 0) - (hourSelectorRect?.bottom || 0) < 16) {
    hourSelector.current?.scrollTo({
      top:
        startScrollDownPosition -
        ((endDownScrollRect?.top || 0) - (hourSelectorRect?.top || 0)),
    });
  }

  if ((endUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0) > 16) {
    hourSelector.current?.scrollTo({
      top:
        startScrollUpPosition -
        ((endUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0)),
    });
  }
}

export const scrollToStartPosition = (
  minuteSelector: React.RefObject<HTMLDivElement>,
  minuteSelectStartPointRect: DOMRect | undefined,
  minuteSelectorRect: DOMRect | undefined,
  startUpScrollRect: DOMRect | undefined,
  endDownScrollRect: DOMRect | undefined,
  MM: number
) => {
  if (MM == 1) {
    return minuteSelector.current?.scrollTo({
      top: (startUpScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) - 30,
    });
  }

  if (MM == 58) {
    return minuteSelector.current?.scrollTo({
      top: (endDownScrollRect?.top || 0) - (minuteSelectorRect?.top || 0) - 30,
    });
  }

  return minuteSelector.current?.scrollTo({
    top:
      (minuteSelectStartPointRect?.top || 0) -
      (minuteSelectorRect?.top || 0) -
      30,
  });
};

export const scrollToStartPositionHour = (
  hourSelector: React.RefObject<HTMLDivElement>,
  hourSelectStartPointRect: DOMRect | undefined,
  hourSelectorRect: DOMRect | undefined,
  startUpScrollRect: DOMRect | undefined,
  endDownScrollRect: DOMRect | undefined,
  HH: number
) => {
  if (HH == 1) {
    return hourSelector.current?.scrollTo({
      top: (startUpScrollRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
    });
  }
  if (HH == 22) {
    return hourSelector.current?.scrollTo({
      top: (endDownScrollRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
    });
  }
  return hourSelector.current?.scrollTo({
    top:
      (hourSelectStartPointRect?.top || 0) - (hourSelectorRect?.top || 0) - 30,
  });
};
