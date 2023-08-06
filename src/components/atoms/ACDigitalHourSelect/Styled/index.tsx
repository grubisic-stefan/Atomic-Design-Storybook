import styled, { StyledComponentProps } from "styled-components";
import { color } from "../../../../utils/_globalVariables";

type ACCalendarHourStepProps = StyledComponentProps<
  "div",
  any,
  {
    selected: boolean;
    color?: string;
  },
  never
>;

export const ACCalendarTimeStep = styled.div<ACCalendarHourStepProps>`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.3s ease-out;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  scroll-snap-align: center;
  padding: 5px 25px;
  border: 0.5px solid transparent;
  border-radius: 5px;
  &:hover {
    border: 0.5px solid var(--color-primary);
    color: ${(props) => (props.selected ? "#fff" : "var(--color-primary)")};
  }
  color: ${(props) => (props.selected ? "#fff" : "rgba(0, 0, 0, 0.7)")};
  background-color: ${(props) => {
    if (props.selected && props.color) {
      return props.color;
    }
    return props.selected ? "var(--color-primary)" : "transparent";
  }};
`;

export const ACCalendarTimerWrap = styled.div`
  width: max-content;
  max-height: 200px;

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
