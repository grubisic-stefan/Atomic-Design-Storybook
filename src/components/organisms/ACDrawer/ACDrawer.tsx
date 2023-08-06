import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

import ACDrawerSub from "./Components/ACDrawerSub";
import ACNavItem from "./Components/ACNavItem";

import { FaArrowCircleLeft } from "react-icons/fa";

import {
  getElementStyleProp,
  navigateTo,
  markSelectItem,
  calculateSideBarLessWidth,
} from "./Helper";

import { ACDrawerPropsT } from "./Types";

import "./ACDrawer.scss";
import ACBackdrop from "../../atoms/ACBackdrop";

let init = true;

export default function ACDrawer({
  content,
  shrink = true,
  style,
  isMobileOpen = false,
  header,
  Footer,
  workSpaceId,
  closeHandle,
  className,
  shrinkBtnWrapClassName,
  shrinkBtnIconClassName,
  navListClassName,
  listItemClassName,
  selectorClassName,
  iconWrapClassName,
  itemTextClassName,
  subNavItemClassName,
}: ACDrawerPropsT) {
  const [isShrink, setIsShrink] = useState(true);
  const [fullWidth, setFullWidth] = useState<undefined | number>(undefined);
  const [lessWidth, setLessWidth] = useState(0);
  const [backdropShow, setBackdropShow] = useState(false);
  const [contentState, setContentState] = useState(content);

  const navRef = useRef(null);
  const iconRef = useRef(null);
  const navIterRef = useRef(null);
  const selectorRef = useRef(null);

  const drawerWidth = isShrink ? fullWidth + "px" : lessWidth + "px";

  useEffect(() => {
    setIsShrink(shrink);
  }, [shrink]);

  useLayoutEffect(() => {
    const fullDrawerWidth = getElementStyleProp(navRef.current, "width");
    setFullWidth(fullDrawerWidth);
    if (window.innerWidth < 600) {
      setIsShrink(false);
    }
  }, []);

  useEffect(() => {
    setLessWidth(calculateSideBarLessWidth(navIterRef, selectorRef, iconRef));
  }, [isShrink]);

  useEffect(() => {
    setBackdropShow(isMobileOpen);
  }, [isMobileOpen]);

  const linkClickHandle = useCallback(
    (e: React.MouseEvent, to: string | undefined | null) => {
      markSelectItem(e);
      navigateTo(to, workSpaceId);
    },
    []
  );

  const shrinkToggle = () => {
    setIsShrink((prev) => !prev);
  };

  const backdropCloseHandle = useCallback(() => {
    setBackdropShow(false);
    closeHandle && closeHandle();
  }, [backdropShow]);

  useEffect(() => {
    const filteredContent = content.filter((c) => !c.hidden);
    filteredContent.forEach((c) => {
      c.items = c.items?.filter((item) => !item.hidden);
    });
    setContentState(filteredContent);
  }, [content]);

  return (
    <>
      {backdropShow && <ACBackdrop onClose={backdropCloseHandle} />}
      <div
        style={{
          width: drawerWidth,
          minWidth: drawerWidth,
          ...style?.wrapper,
        }}
        className={`
        ACDrawer 
        ${isMobileOpen ? "mobileOpen" : ""} 
        ${className}
      `}
      >
        <div
          onClick={shrinkToggle}
          className={`shrinkToggleBtn ${shrinkBtnWrapClassName || ""}`}
          style={style?.shrinkBtnWrap}
        >
          <FaArrowCircleLeft
            style={{
              transform: isShrink ? "rotate(0deg)" : "rotate(180deg)",
              transition: "all 0.3s",
              width: "25px",
              height: "25px",
              ...style?.shrinkBtnIcon,
            }}
            className={shrinkBtnIconClassName || ""}
          />
        </div>
        <nav
          ref={navRef}
          style={style?.navList}
          className={`ACDrawer__nav ${navListClassName || ""}`}
        >
          {header && header({ isShrink })}
          <ul>
            {contentState.map(({ items, icon, title, match }) => {
              if (items) {
                return (
                  <ACDrawerSub
                    icon={icon}
                    items={items}
                    title={title}
                    isShrink={isShrink}
                    linkClick={linkClickHandle}
                    listItemClassName={listItemClassName}
                    selectorClassName={selectorClassName}
                    iconWrapClassName={iconWrapClassName}
                    itemTextClassName={itemTextClassName}
                    subNavItemClassName={subNavItemClassName}
                    style={style}
                    key={title}
                    workSpaceId={workSpaceId}
                  />
                );
              }
              return (
                <ACNavItem
                  style={style}
                  navIterRef={navIterRef}
                  isShrink={isShrink}
                  item={{ items, icon, title, match }}
                  key={title}
                  selectorRef={selectorRef}
                  iconRef={iconRef}
                  itemTextClassName={itemTextClassName}
                  listItemClassName={listItemClassName}
                  linkClickHandle={linkClickHandle}
                  selectorClassName={selectorClassName}
                  iconWrapClassName={iconWrapClassName}
                  workSpaceId={workSpaceId}
                />
              );
            })}
          </ul>
          {Footer && <Footer isShrink={isShrink} />}
        </nav>
      </div>
    </>
  );
}
