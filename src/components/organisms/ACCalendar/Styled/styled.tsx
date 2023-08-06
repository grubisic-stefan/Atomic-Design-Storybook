import styled, { StyledComponentProps } from "styled-components";

type ACCalendarPickerProps = StyledComponentProps<
  "div",
  any,
  { isPickerOpen: boolean },
  never
>;
type ACCalendarDayProps = StyledComponentProps<
  "div",
  any,
  {
    isCurrentDay: boolean;
    isSelectedDay: boolean;
    style?: React.CSSProperties;
  },
  never
>;
type ACCalendarHourStepProps = StyledComponentProps<
  "div",
  any,
  {
    selected: boolean;
  },
  never
>;

export const ACCalendarWrap = styled.div`
  width: max-content;
  position: relative;
  border-radius: 5px;
`;

export const ACCalendarPicker = styled.div<ACCalendarPickerProps>`
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
  width: max-content;
  transition: opacity 0.3s ease-out;
  position: absolute;
  z-index: 10;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  top: calc(100% + 5px);
  opacity: ${(props) => (props.isPickerOpen ? "1" : "0")};
  height: ${(props) => (props.isPickerOpen ? "auto" : "0")};
`;

export const ACCalendarPickerContent = styled.div`
  position: relative;
`;

export const ACCalendarPickerBody = styled.div`
  padding: 10px;
`;

export const ACCalendarPickerDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
`;

export const ACCalendarPickerFooter = styled.div`
  padding: 0 10px 10px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  svg {
    path {
      fill: var(--color-primary);
    }
  }
`;

export const ACCalendarDay = styled.div<ACCalendarDayProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  font-family: var(--main-font);
  cursor: pointer;
  border: ${(props) =>
    props.isCurrentDay ? "1px solid var(--color-primary)" : "none"};
  background-color: ${(props) =>
    props.isSelectedDay ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.isSelectedDay ? "#fff" : "rgba(0, 0, 0, 0.7)")};

  &:hover {
    background-color: ${(props) =>
      props.isSelectedDay ? "var(--color-primary)" : "#e5e5e5"};
  }
`;

export const ACCalendarTimerWrap = styled.div`
  width: max-content;

  height: 100%;
  overflow-y: auto;
  font-size: 20px;
  font-weight: 600;
  color: #000;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    z-index: 9;
    background: rgb(229, 229, 229);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.14751838235294112) 0%,
      rgba(255, 255, 255, 0.7889749649859944) 35%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    z-index: 9999;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.14751838235294112) 0%,
      rgba(255, 255, 255, 0.7889749649859944) 35%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export const ACCalendarTimeStep = styled.div<ACCalendarHourStepProps>`
  width: 100%;
  // height: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.3s ease-out;
  font-weight: 400;
  font-family: var(--main-font), sans-serif;
  scroll-snap-align: center;
  padding: 5px 25px;
  border: 0.5px solid transparent;
  &:hover {
    border: 0.5px solid var(--color-primary);
    color: ${(props) => (props.selected ? "#fff" : "var(--color-primary)")};
    border-radius: 5px;
  }
  color: ${(props) => (props.selected ? "#fff" : "rgba(0, 0, 0, 0.7)")};
  background-color: ${(props) =>
    props.selected ? "var(--color-primary)" : "transparent"};
`;

export const ACCalendarPickerHeader = styled.div`
  background-color: var(--color-primary);
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ACCalendarPickerHeaderTitle = styled.div`
  font-size: 14px;
  letter-spacing: 1px;
  font-family: var(--main-font);
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  align-items: center;
  display: flex;
`;

export const ACCalendarMonthArrow = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    path {
      fill: #fff;
    }
  }
`;
export const ACCalendarCurrentMonth = styled.div`
  min-width: 100px;
  text-align: center;
  cursor: pointer;
  font-family: var(--main-font);
`;

export const ACCalendarHeaderYear = styled.div`
  font-size: 14px;
  letter-spacing: 1px;
  font-family: var(--main-font);
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`;

export const ACCalendarMonthsWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
  justify-items: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  z-index: 10;
`;

export const ACCalendarMonthField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-family: var(--main-font);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
`;

export const ACCalendarNextPrevMonthDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 400;
  font-family: var(--main-font);
  cursor: pointer;
  color: #e5e5e5;
  &:hover {
    color: #000;
    background-color: #e5e5e5;
  }
`;

export const ACCalendarSetTimeWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  z-index: 10;
`;

export const ACCalendarClockWrap = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: var(--color-primary);
`;

export const ACCalendarClockDot = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SmallNumberWrap = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  font-family: var(--main-font);
  font-size: 12px;
  font-weight: 400;
  color: #fff;

  border-radius: 50%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: 10px 120px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: #fff;
    color: hsla(0, 0%, 0%, 0.684);
  }
`;

export const BigNumberWrap = styled.div`
  font-family: var(--main-font);
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 60px;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  transform-origin: 10px 70px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #fff;
    color: hsla(0, 0%, 0%, 0.684);
  }
`;

export const ACCalendarClockBigHandle = styled.div`
  position: absolute;
  width: 4px;
  height: 102px;
  background-color: #fff;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 0) rotate(0deg);
  transform-origin: 0px 102px;
  border-radius: 5px;
`;

export const ACCalendarClockSmallHandle = styled.div`
  position: absolute;
  width: 4px;
  height: 52px;
  background-color: #fff;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 0) rotate(0deg);
  transform-origin: 0px 52px;
  border-radius: 5px;
`;

export const ACCalendarMinuteDot = styled.div`
  width: 2px;
  height: 2px;
  background-color: #000;
  border-radius: 50%;
`;

export const ACCalendarDigitalTimePicker = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const ACCalendarTimeSeparator = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  font-family: var(--main-font), sans-serif;
  margin: 0 10px;
`;
export const ACCalendarWeekDaysWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  justify-items: center;
`;

export const ACCalendarWeekDay = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  font-family: var(--main-font);
`;

export const ACCalendarYearSelectWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
  justify-items: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  transform-origin: top;
  overflow: auto;
  z-index: 10;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ACCalendarYearSelectItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: var(--main-font);
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
`;
