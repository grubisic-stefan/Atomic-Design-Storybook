import React, { CSSProperties } from "react";
import { ACAvatar } from "../../../atoms";
import { ListItem } from "../styled/ListItem";

type Props = {
  label: string;
  domID: number;
  isSelected: boolean;
  isDisabled: boolean;
  style?: CSSProperties;
  customRender: React.ReactNode;
};

const OptionItem = ({
  label,
  domID,
  isSelected,
  isDisabled,
  style,
  customRender,
}: Props) => {
  return (
    <ListItem
      data-dom-id={domID}
      className={`${isSelected ? "isSelected" : ""} ${
        isDisabled ? "isDisabled" : ""
      }`}
      style={style}
    >
      <>
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          disabled={isDisabled}
        />
        {customRender && (
          <span className="customRender">
            <ACAvatar img={customRender} />
          </span>
        )}
        {label}
      </>
    </ListItem>
  );
};

export default OptionItem;
