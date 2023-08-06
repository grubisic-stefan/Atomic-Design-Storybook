import React, { useEffect, useRef, useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";

import { ACDrawerSubT } from "../Types";
import { getElementStyleProp } from "../Helper";
import ACNavItem from "./ACNavItem";

const ACDrawerSub = ({
  icon,
  items,
  title,
  isShrink = true,
  linkClick,
  listItemClassName,
  selectorClassName,
  iconWrapClassName,
  itemTextClassName,
  subNavItemClassName,
  style,
  workSpaceId,
}: ACDrawerSubT) => {
  const [isOpen, setIsOpen] = useState(false);

  const subRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (subRef.current?.querySelector(".selectEffect")) setIsOpen(true);
  }, []);

  const openedHeight = () => {
    return getElementStyleProp(subRef.current, "height");
  };

  const subMenuToggleHandle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <li
        style={style?.listItem}
        className={`
          ACDrawer__nav-item 
          ${isShrink ? "shrink-nav-item" : "less-nav-item"}
          ${listItemClassName || ""}
        `}
        onClick={subMenuToggleHandle}
      >
        <div
          style={{
            justifyContent: isShrink ? "flex-start" : "center",
            ...style?.selector,
          }}
          className={`subSelector ${selectorClassName || ""}`}
        >
          <div className="ACDrawer__nav-item-wrap">
            <div className="ACDrawer__nav-item-wrap">
              <div
                style={style?.iconWrap}
                className={`iconWrap ${iconWrapClassName || ""}`}
              >
                {icon || ""}
              </div>
              {isShrink && (
                <div
                  style={style?.itemText}
                  className={`ACDrawer__linkText ${itemTextClassName}`}
                >
                  {title}
                </div>
              )}
            </div>
          </div>
        </div>
        <RiArrowDropDownLine
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          className="ACDrawer__submenu-arr"
        />
      </li>
      <ul
        style={{ height: isOpen ? openedHeight() : 0 }}
        className={`ACDrawer__subMenu`}
      >
        <div ref={subRef} className="submenuItemWrap">
          {items.map((item) => (
            <ACNavItem
              style={style}
              nested={true}
              isShrink={isShrink}
              item={item}
              itemTextClassName={itemTextClassName}
              listItemClassName={listItemClassName}
              linkClickHandle={linkClick}
              selectorClassName={selectorClassName}
              iconWrapClassName={iconWrapClassName}
              subNavItemClassName={subNavItemClassName}
              key={item.title}
              workSpaceId={workSpaceId}
            />
          ))}
        </div>
      </ul>
    </>
  );
};

export default ACDrawerSub;
