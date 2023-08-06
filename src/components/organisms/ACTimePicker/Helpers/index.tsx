export const checkIsDeleting = (value: string, inputString: string) => {
  if (value?.length < inputString?.length) {
    return true;
  }
  return false;
};

export const checkIsInputNumber = (value: string, index: number) => {
  if (!Number(value[index]) && value[index] !== "0") {
    return false;
  }
  return true;
};

export const checkIsHourEntered = (timeFormat: string, nextIndex: number) => {
  if (timeFormat[nextIndex] == ":") {
    return true;
  }
  return false;
};

export const checkIfStartTypeAtIndex2 = (
  timeFormat: string,
  index: number,
  inputString: string
) => {
  if (timeFormat[index] == ":" && inputString[index] !== ":") {
    return true;
  }
  return false;
};
export const checkIsMinuteEntered = (
  timeFormat: string,
  index: number,
  nextIndex: number
) => {
  if (!timeFormat[nextIndex] && timeFormat[index]) {
    return true;
  }
  return false;
};

export const checkIsEnteredMinuteValid = (value: string, index: number) => {
  if (Number(value[index - 1] + value[index]) > 59) {
    return false;
  }
  return true;
};

export const checkIsEnd = (timeFormat: string, index: number) => {
  if (!timeFormat[index]) {
    return true;
  }
  return false;
};

export const checkIsTypedValueValid = (HH: string, MM: string) => {
  if (
    Number(HH) > 23 ||
    Number(MM) > 59 ||
    (HH !== "0" && !Number(HH)) ||
    (!Number(MM) && MM !== "0")
  ) {
    return false;
  }
  return true;
};

export const transformToTwoDigit = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
};

export const createTimeString = (HH: number, MM: number) => {
  return `${transformToTwoDigit(HH)}:${transformToTwoDigit(MM)}`;
};
