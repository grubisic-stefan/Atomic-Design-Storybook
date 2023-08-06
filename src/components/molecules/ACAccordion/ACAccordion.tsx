import React, { CSSProperties, FC, ReactNode, useRef, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./ACAccordion.scss";
export interface IACAccordionItem {
  title: ReactNode;
  data: ReactNode;
  disabled?: boolean;
}

export interface ACAccordionItemProps {
  index: number;
  title: ReactNode;
  data: ReactNode;
  visible: boolean;
  handleAddItemToVisibleItems: (itemIndex: number) => void;
  titleDivStyle?: CSSProperties;
  disabled?: boolean;
}

const ACAccordionItem: FC<ACAccordionItemProps> = ({
  index,
  title,
  data,
  visible,
  handleAddItemToVisibleItems,
  titleDivStyle,
  disabled = false,
}) => {
  const dataRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`ACAccordion-item ${
        disabled ? "ACAccordion-item-disabled" : ""
      }`}
    >
      {disabled && <div className={`ACAccordion-item-disableWrapper`}></div>}
      <div
        className={`ACAccordion-item-title-wrapper`}
        onClick={() => handleAddItemToVisibleItems(index)}
        style={titleDivStyle}
      >
        <div className="ACAccordion-item-title"> {title} </div>
        <AiOutlineArrowUp
          className={`ACAccordion-item-title-arrowIcon ${
            visible
              ? "ACAccordion-item-title-arrowIcon-visible"
              : "ACAccordion-item-title-arrowIcon-hidden"
          }`}
        />
      </div>
      {!disabled && (
        <div
          data-testid="ACAccordion-item-data-wrapper"
          className={`ACAccordion-item-data-wrapper ${
            visible
              ? "ACAccordion-item-data-wrapper-visible"
              : "ACAccordion-item-data-wrapper-hidden"
          }`}
          style={
            visible ? { height: dataRef.current?.offsetHeight } : { height: 0 }
          }
        >
          {/* BECAUSE BY DEFAULT PARENT HEIGHT DOES NOT INCLUDE CHILD MARGIN WITHOUT PARENT BORDER */}
          <div style={{ border: "1px solid transparent" }} ref={dataRef}>
            {data}
          </div>
        </div>
      )}
    </div>
  );
};

export interface ACAccordionProps {
  items: IACAccordionItem[];
  maxOneVisible?: boolean;
  titleDivStyle?: CSSProperties;
}

const ACAccordion: FC<ACAccordionProps> = ({
  items,
  maxOneVisible = false,
  titleDivStyle,
}) => {
  const [visibleItems, setVisibleItems] = useState([] as number[]);

  const addItemToVisibleItems = (itemIndex: number) => {
    if (visibleItems.includes(itemIndex)) {
      setVisibleItems((prevState) => prevState.filter((i) => i !== itemIndex));
    } else {
      maxOneVisible
        ? setVisibleItems([itemIndex])
        : setVisibleItems((prevState) => [...prevState, itemIndex]);
    }
  };

  return (
    <div data-testid="ACAccordion" className="ACAccordion">
      {items.map((item, i) => (
        <ACAccordionItem
          key={i}
          index={i}
          title={item.title}
          data={item.data}
          visible={visibleItems.includes(i)}
          handleAddItemToVisibleItems={addItemToVisibleItems}
          titleDivStyle={titleDivStyle}
          disabled={item.disabled}
        />
      ))}
    </div>
  );
};

export default ACAccordion;
