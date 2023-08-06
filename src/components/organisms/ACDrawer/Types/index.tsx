import React, { CSSProperties, ReactElement } from "react";

export type ACDrawerContentT = {
  itemId?: number | string;
  type?: string;
  title: string;
  match?: string | null;
  icon?: ReactElement;
  items?: ACDrawerContentT[];
  position?: number;
  hidden?: boolean;
};
export type ACDrawerPropsT = {
  type?: "static" | "hidden";
  isShow?: boolean;
  content: ACDrawerContentT[];
  section?: ACDrawerContentT[];
  shrink?: boolean;
  isMobileOpen?: boolean;
  header?: (params: { isShrink: boolean }) => ReactElement;
  Footer?: any;
  workSpaceId?: string;
  closeHandle?: () => void;
  className?: string;
  shrinkBtnWrapClassName?: string;
  shrinkBtnIconClassName?: string;
  navListClassName?: string;
  listItemClassName?: string;
  selectorClassName?: string;
  iconWrapClassName?: string;
  itemTextClassName?: string;
  subNavItemClassName?: string;

  style?: {
    wrapper?: CSSProperties;
    shrinkBtnWrap?: CSSProperties;
    shrinkBtnIcon?: CSSProperties;
    navList?: CSSProperties;
    listItem?: CSSProperties;
    selector?: CSSProperties;
    iconWrap?: CSSProperties;
    itemText?: CSSProperties;
    subNavItem?: CSSProperties;
  };
};

export type ACLinkPropT = {
  children: ReactElement | string;
  to: string;
  className?: string;
  workSpaceId?: string;
};
export type ACDrawerSubT = {
  icon?: any;
  items: ACDrawerContentT[];
  title: string;
  isShrink?: boolean;
  linkClick: (e: React.MouseEvent, to: string | undefined | null) => void;
  workSpaceId?: string;
  listItemClassName?: string;
  selectorClassName?: string;
  iconWrapClassName?: string;
  itemTextClassName?: string;
  subNavItemClassName?: string;

  style?: {
    wrapper?: CSSProperties;
    shrinkBtnWrap?: CSSProperties;
    shrinkBtnIcon?: CSSProperties;
    navList?: CSSProperties;
    listItem?: CSSProperties;
    selector?: CSSProperties;
    iconWrap?: CSSProperties;
    itemText?: CSSProperties;
    subNavItem?: CSSProperties;
  };
};

export type ACNavItemT = {
  navIterRef?: any;
  isShrink?: boolean;
  item?: any;
  selectorRef?: any;
  iconRef?: any;
  nested?: boolean;
  linkClickHandle?: (
    e: React.MouseEvent,
    to: string | undefined | null
  ) => void;
  workSpaceId?: string;
  itemTextClassName?: string;
  listItemClassName?: string;
  selectorClassName?: string;
  iconWrapClassName?: string;
  subNavItemClassName?: string;

  style?: {
    listItem?: CSSProperties;
    selector?: CSSProperties;
    iconWrap?: CSSProperties;
    itemText?: CSSProperties;
    subNavItem?: CSSProperties;
  };
};
