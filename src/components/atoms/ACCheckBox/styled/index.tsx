import styled, { StyledComponentProps } from "styled-components";
import { color, font, size } from "../../../../utils/_globalVariables";
import { BsCheck2 } from "react-icons/bs";

type TableScrollProps = StyledComponentProps<
  "div",
  any,
  {
    selectedBgColor?: string;
    selectedBorderColor?: string;
    borderColor?: string;
  },
  never
>;
export const CheckBox = styled.div<TableScrollProps>`
  width: 100%;
  height: 100%;
  /* border: 1px solid ${color.gray}; */
  border: 1px solid ${(props) => props.borderColor || color.gray};
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-out;
`;

export const ChackBoxWrap = styled.div<TableScrollProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${size.s4};
  height: ${size.s4};
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    z-index: 1;
    &:checked + ${CheckBox} {
      background-color: ${(props) => props.selectedBgColor || color.primary};
      border: 1px solid ${(props) => props.selectedBorderColor || color.primary};
      /* background-color: ${color.primary};
      border: 1px solid ${color.primary}; */
      border-radius: 2px;
    }
  }
`;

export const PureCheckBox = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  z-index: 1;
  &:checked + ${CheckBox} {
    background-color: ${color.primary};
    border: 1px solid ${color.primary};
    border-radius: 2px;
  }
`;
