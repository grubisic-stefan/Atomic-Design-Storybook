import React from "react";

export const getElementStyleProp = (elementRef: any, proper: string) => {
  return +window
    .getComputedStyle(elementRef)
    .getPropertyValue(proper)
    .replace("px", "");
};

export const calculateSideBarLessWidth = (
  navIterRef: React.MutableRefObject<null>,
  selectorRef: React.MutableRefObject<null>,
  iconRef: React.MutableRefObject<null>
) => {
  const navPadding =
    getElementStyleProp(navIterRef.current, "padding-left") * 2;

  const selectorPadding =
    getElementStyleProp(selectorRef.current, "padding-left") +
    getElementStyleProp(selectorRef.current, "padding-right");
  const iconWidth = getElementStyleProp(iconRef.current, "width");

  return navPadding + iconWidth + selectorPadding;
};

export const markSelectItem = (e: React.MouseEvent) => {
  document.querySelector(".selectEffect")?.remove(); //remove selector if selected
  // @ts-ignore:next-line
  const selector = e.target.querySelector(".selector");
  const selRect = selector.getBoundingClientRect();
  const effect = document.createElement("span");

  let x = e.clientX - selRect.left;
  let y = e.clientY - selRect.top;

  effect.style.left = x + "px";
  effect.style.top = y + "px";
  effect.classList.add("selectEffect");

  selector.appendChild(effect);
};

export const markSelectedOnUrlChange = (
  item: any,
  url: any,
  workspaceId: boolean | string = false
) => {
  let urlAddress = url;
  if (workspaceId) urlAddress = `/workspace/${workspaceId}${url}`;
  if (
    urlAddress == window.location.pathname &&
    !item?.querySelector(".selectEffect")
  ) {
    document.querySelector(".selectEffect")?.remove();

    const selector = item.querySelector(".selector");
    const effect = document.createElement("span");

    effect.style.left = "50%";
    effect.style.top = "50%";
    effect.classList.add("selectEffect");

    selector.appendChild(effect);
  }
};

export const navigateTo = (
  link: string | undefined | null,
  workSpaceId: string | undefined
) => {
  const navEvent = new PopStateEvent("popstate");
  const url = workSpaceId ? `/workspace/${workSpaceId}${link}` : link;
  window.history.pushState({}, "", url);
  window.dispatchEvent(navEvent);
};

export const mergeRefs = (...refs: any) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst: any) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};
