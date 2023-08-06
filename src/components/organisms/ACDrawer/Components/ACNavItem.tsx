import React, { useEffect, useRef } from "react";

import ACLink from "./ACLink";

import { markSelectedOnUrlChange, mergeRefs } from "../Helper";

import { ACNavItemT } from "../Types";

export default function ACNavItem({
  style,
  item,
  isShrink,
  nested = false,
  linkClickHandle,
  selectorRef,
  navIterRef,
  iconRef,
  itemTextClassName,
  listItemClassName,
  selectorClassName,
  iconWrapClassName,
  subNavItemClassName,
  workSpaceId,
}: ACNavItemT) {
  const selectLocalRef = useRef(null);

  useEffect(() => {
    markSelectedOnUrlChange(
      selectLocalRef.current,
      item.match,
      workSpaceId || false
    );

    window.addEventListener("popstate", () => {
      markSelectedOnUrlChange(
        selectLocalRef.current,
        item.match,
        workSpaceId || false
      );
    });

    return () => {
      window.removeEventListener("popstate", () => {
        markSelectedOnUrlChange(
          selectLocalRef.current,
          item.match,
          workSpaceId || false
        );
      });
    };
  }, []);

  const listItemClass = () => {
    if (nested) {
      let itemClass = isShrink ? "sub-nav-item" : "less-nav-item";
      itemClass += " " + subNavItemClassName || "";
      return itemClass;
    }
    let itemClass = isShrink ? "shrink-nav-item" : "less-nav-item";
    itemClass += " " + listItemClassName || "";
    return itemClass;
  };

  return (
    <li
      ref={mergeRefs(navIterRef, selectLocalRef)}
      style={nested ? style?.subNavItem : style?.listItem}
      className={`
          ACDrawer__nav-item 
          ${listItemClass()}
        `}
      onClick={(e) => linkClickHandle && linkClickHandle(e, item.match)}
    >
      <div
        ref={selectorRef}
        style={{
          justifyContent: isShrink ? "flex-start" : "center",
          ...style?.selector,
        }}
        className={`selector ${selectorClassName || ""}`}
      >
        <div className="ACDrawer__nav-item-wrap">
          <div
            ref={iconRef}
            style={style?.iconWrap}
            className={`iconWrap ${iconWrapClassName || ""}`}
          >
            {item.icon || ""}
          </div>

          {isShrink && (
            <div
              style={style?.itemText}
              className={`ACDrawer__linkText ${itemTextClassName}`}
            >
              <ACLink to={item.match || ""}>{item.title}</ACLink>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
