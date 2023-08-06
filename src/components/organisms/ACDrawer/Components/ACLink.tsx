import React from "react";
import { ACLinkPropT } from "../Types";

const navEvent = new PopStateEvent("popstate");
const ACLink = ({ to, children, className, workSpaceId }: ACLinkPropT) => {
  const navLinkClickHandle = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", `/workspace/${workSpaceId}/${to}`);
    window.dispatchEvent(navEvent);
  };
  return (
    <a
      className={`ACDrawer__link ${className}`}
      onClick={(e) => navLinkClickHandle(e)}
      href={to}
    >
      {children}
    </a>
  );
};
export default ACLink;
