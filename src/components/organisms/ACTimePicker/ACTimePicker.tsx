import React, { useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ACInput, ACTransition } from "../../atoms";
import ACDigitalHourSelect from "../../atoms/ACDigitalHourSelect/ACDigitalHourSelect";
import ACDigitalMinutesPicker from "../../atoms/ACDigitalMinutesPicker/ACDigitalMinutesPicker";
import "./ACTimePicker.scss";
import { ACTimePickerSelectWrap, ACTimePickerWrap } from "./Styled";
import { ACEvenType } from "../../../globalTypes/index";
import { color } from "../../../utils/_globalVariables";
import {
  checkIsDeleting,
  checkIsInputNumber,
  checkIsHourEntered,
  checkIfStartTypeAtIndex2,
  checkIsMinuteEntered,
  checkIsEnteredMinuteValid,
  checkIsEnd,
  checkIsTypedValueValid,
  createTimeString,
} from "./Helpers";
export type ACTimePickerProps = {
  style?: {
    container?: React.CSSProperties;
    input?: { [key: string]: React.CSSProperties };
    digitalHourWrap?: React.CSSProperties;
    digitalHour?: React.CSSProperties;
    digitalMinuteWrap?: React.CSSProperties;
    digitalMinute?: React.CSSProperties;
  };
  name?: string;
  defaultValue?: string;
  errorMessage?: string;
  value?: string;
  color?: string;
  classNames?: {
    digitalHourClass?: string;
    digitalMinuteClass?: string;
  };
  onChange: (
    dateString: string | undefined,
    e: ACEvenType<undefined, undefined | string>
  ) => void;
  onBlur?: (e: ACEvenType<undefined, string>) => void;
};
const timeFormat = "HH:MM";
let initial = true;

const ACTimePicker = ({
  style,
  classNames,
  onChange,
  onBlur,
  name,
  value,
  color,
  errorMessage,
}: ACTimePickerProps) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [HH, setHH] = useState<number | undefined>(undefined);
  const [MM, setMM] = useState<number | undefined>(undefined);
  const [inputString, setInputString] = useState<string | undefined>("");
  const [error, setError] = useState<false | string>(false);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputString(value);
    if (value) {
      setHH(Number(value.split(":")[0]));
      setMM(Number(value.split(":")[1]));
    }
  }, [value]);

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [isFocused]);

  const openTimePickerHandler = useCallback(() => {
    setIsTimePickerOpen((prev) => !prev);
  }, []);

  const onChangeHandler = useCallback(
    (e: any) => {
      const value = e.target.value;
      const nextIndex = value?.length;
      const index = value?.length - 1;

      if (checkIsDeleting(value, inputString as string)) {
        setError(false);
        return setInputString(value);
      }

      if (!checkIsInputNumber(value, index)) {
        setInputString("");
        return setError("Invalid Time");
      }

      if (checkIsHourEntered(timeFormat, nextIndex)) {
        if (Number(value) > 23) return setError("Invalid Hour");
        setError(false);
        return setInputString(value + ":");
      }

      if (checkIfStartTypeAtIndex2(timeFormat, index, inputString as string)) {
        return setInputString((prev) => prev + ":" + value[index]);
      }

      if (checkIsMinuteEntered(timeFormat, index, nextIndex)) {
        if (!checkIsEnteredMinuteValid(value, index))
          return setError("Invalid Minute");
        setError(false);
        return setInputString(value);
      }

      if (checkIsEnd(timeFormat, index)) return;

      setInputString(value);
    },
    [inputString]
  );

  const onBlurHandler = useCallback(() => {
    let [HH, MM] = (inputString as string).split(":");

    if (!checkIsTypedValueValid(HH, MM)) {
      setError("Invalid Time");
      return onChange(undefined, {
        ac: { value: undefined, name, type: "ACTimePicker" },
      } as ACEvenType<undefined, undefined>);
    }

    onChange(createTimeString(Number(HH), Number(MM)), {
      ac: {
        value: createTimeString(Number(HH), Number(MM)),
        name,
        type: "ACTimePicker",
      },
    } as ACEvenType<undefined, string>);
  }, [inputString]);

  const onHourSelectHandler = useCallback(
    (HH: number) => {
      if (MM || MM === 0) {
        onChange(`${createTimeString(HH, MM)}`, {
          ac: {
            value: `${createTimeString(HH, MM)}`,
            name,
            type: "ACTimePicker",
          },
        } as ACEvenType<undefined, string>);
      } else {
        setHH(HH);
      }
      setError(false);
      setInputString(
        (prev) => (HH < 10 ? `0${HH}` : HH) + ":" + (prev?.split(":")[1] || "")
      );
    },
    [MM]
  );

  const onMinuteSelectHandler = useCallback(
    (MM: number) => {
      if (HH || HH === 0) {
        onChange(`${createTimeString(HH, MM)}`, {
          ac: {
            value: `${createTimeString(HH, MM)}`,
            name,
            type: "ACTimePicker",
          },
        } as ACEvenType<undefined, string>);
      } else {
        setMM(MM);
      }

      setError(false);

      setInputString(
        (prev) =>
          (prev?.split(":")[0] || `${" "} ${" "}`) +
          ":" +
          (MM < 10 ? `0${MM}` : MM)
      );
    },
    [HH]
  );

  function handleFocus(e: any) {
    if (!isFocused && timePickerRef.current?.contains(e.target))
      setIsFocused(true);

    if (isFocused && !timePickerRef.current?.contains(e.target)) {
      setIsFocused(false);
      onBlur &&
        onBlur({
          ac: {
            name,
            value: `${HH}:${MM}`,
            type: "ACTimePicker",
            event: "blur",
          },
        } as ACEvenType<undefined, string>);
    }
  }

  return (
    <ACTimePickerWrap
      role="timePickerWrap"
      ref={timePickerRef}
      style={{
        width: "120px",
        ...style?.container,
      }}
    >
      <ACInput
        fullWidth
        placeholder="HH:MM"
        addonAfterOnClick={openTimePickerHandler}
        onChange={(e) => {
          onChangeHandler(e);
        }}
        onBlur={onBlurHandler}
        dataTestId="TimePicker__input"
        value={inputString}
        errorMessage={error ? error : "Invalid Time"}
        hasError={error ? true : false}
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
        addonAfter={
          <AiOutlineClockCircle role="timeIcon" style={{ fill: "#FFF" }} />
        }
      />
      <ACTransition
        isShow={isTimePickerOpen}
        contentHeight={202}
        time={300}
        onClose={() => setIsTimePickerOpen(false)}
        forwardRef={timePickerRef}
      >
        <ACTimePickerSelectWrap>
          <ACDigitalHourSelect
            style={{
              digitalHourWrap: {
                width: "45%",
                ...style?.digitalHourWrap,
              },
              digitalHour: {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                ...style?.digitalHour,
              },
            }}
            HH={HH}
            hourSelect={onHourSelectHandler}
            className={classNames?.digitalHourClass}
            color={color}
          />

          <ACDigitalMinutesPicker
            style={{
              digitalMinuteWrap: {
                width: "45%",
                ...style?.digitalMinuteWrap,
              },
              digitalMinute: {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
                ...style?.digitalMinute,
              },
            }}
            MM={MM}
            color={color}
            minuteSelect={onMinuteSelectHandler}
            className={classNames?.digitalMinuteClass}
          />
        </ACTimePickerSelectWrap>
      </ACTransition>
    </ACTimePickerWrap>
  );
};

export default ACTimePicker;
