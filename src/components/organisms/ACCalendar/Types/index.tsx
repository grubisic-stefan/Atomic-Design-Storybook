import { CSSProperties } from "react";
import { ACEvenType } from "../../../../globalTypes";

export type markRangeType = {
  days: number[];
  style?: CSSProperties;
  year: number;
  month: number;
  label?: string;
  disabled?: boolean;
};

export type styleProp = {
  [key: string]: CSSProperties;
};
export type classNamesProp = {
  [key: string]: string;
};

export type ACCalendarProps = {
  dateFormat?:
    | "DD-MM-YYYY"
    | "MM-DD-YYYY"
    | "YYYY-MM-DD"
    | "DD/MM/YYYY"
    | "MM/DD/YYYY"
    | "YYYY/MM/DD"
    | "DD.MM.YYYY"
    | "MM.DD.YYYY"
    | "YYYY.MM.DD"
    | "DD-MM-YYYY HH:MM"
    | "MM-DD-YYYY HH:MM"
    | "YYYY-MM-DD HH:MM"
    | "DD/MM/YYYY HH:MM"
    | "MM/DD/YYYY HH:MM"
    | "YYYY/MM/DD HH:MM"
    | "DD.MM.YYYY HH:MM"
    | "MM.DD.YYYY HH:MM"
    | "YYYY.MM.DD HH:MM";

  markRange?: markRangeType[];
  startDate?: Date;
  endDate?: Date;
  defaultDate?: Date;
  name?: string;
  timePicker?: boolean;
  digitalClock?: boolean;
  style?: styleProp;
  classNames?: classNamesProp;
  onChange?: (date: Date, event: ACEvenType<undefined, string>) => void;
  onBlur?: (event: ACEvenType<undefined, string>) => void;
  onErrorDate?: (error: any) => void;
  disableWeekDays?: { day: number; style: CSSProperties }[];
};
