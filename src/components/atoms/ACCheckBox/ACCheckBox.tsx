import React, { ChangeEvent, CSSProperties } from "react";
import { ACEvenType } from "../../../globalTypes";
import { ChackBoxWrap, CheckBox, PureCheckBox } from "./styled";
import { BsCheck2 } from "react-icons/bs";
import "./ACCheckBox.scss";

type ACCheckBoxProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ACEvenType<ChangeEvent<HTMLInputElement>, boolean>) => void;
  style?: {
    checkBox?: CSSProperties;
    arrow?: CSSProperties;
  };
  selectedBgColor?: string;
  selectedBorderColor?: string;
  borderColor?: string;
};

const ACCheckBox = ({
  checked,
  disabled,
  onChange,
  style,
  selectedBgColor,
  selectedBorderColor,
  borderColor,
}: ACCheckBoxProps) => {
  return (
    <ChackBoxWrap
      role={"checkBoxWrapper"}
      selectedBgColor={selectedBgColor}
      selectedBorderColor={selectedBorderColor}
      style={style?.checkBox}
    >
      <input
        role={"checkBoxPure"}
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      ></input>
      <CheckBox role={"checkBox"} borderColor={borderColor}>
        <BsCheck2 style={style?.arrow} className="checkArrow" />
      </CheckBox>
    </ChackBoxWrap>
  );
};

export default ACCheckBox;
