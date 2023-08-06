import React, { useRef, useEffect, useState } from "react";

import {
  getInEndClass,
  getInStartClass,
  getOutEndClass,
  getOutStartClass,
  removeInEndAndAddOutStartClass,
  removeInStartAndAddInEndClass,
  removeOutEndAndAddInEndClass,
  removeOutStartAndAddOutEndClass,
} from "./helpers";

import { ACTransitionT, TimeOutVariableT } from "./types";

import "./ACTransition.scss";

let init = true;

let showTimeout: TimeOutVariableT;
let setClassesInTimeout: TimeOutVariableT;
let setClassesOutTimeout: TimeOutVariableT;

const ACTransition = ({
  children,
  time = 0,
  isShow = false,
  inStart = "",
  inEnd = "",
  outStart = "",
  outEnd = "",
  className = "",
  forwardRef,
  contentHeight,
  onClose,
}: ACTransitionT) => {
  const [show, setShow] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onClose) document.addEventListener("click", handleDocumentClick);

    return () => {
      if (onClose) document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (isShow && !show) {
      setShow(true);
    } else if (isShow && show) {
      removeOutEndAndAddInEndClass(
        el.current,
        !contentHeight ? inEnd : getInEndClass(forwardRef, contentHeight),
        !contentHeight ? outEnd : getOutEndClass(forwardRef, contentHeight)
      );
    }

    if (!init && !isShow) {
      showTimeout = setTimeout(() => {
        setShow(false);
      }, time);

      removeInEndAndAddOutStartClass(
        el.current,
        !contentHeight ? outStart : getOutStartClass(forwardRef, contentHeight),
        !contentHeight ? inEnd : getInEndClass(forwardRef, contentHeight)
      );

      setClassesInTimeout = setTimeout(() => {
        removeOutStartAndAddOutEndClass(
          el.current,
          !contentHeight
            ? outStart
            : getOutStartClass(forwardRef, contentHeight),
          !contentHeight ? outEnd : getOutEndClass(forwardRef, contentHeight)
        );
      }, 1);
    }

    init = false;
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(setClassesInTimeout);
    };
  }, [isShow]);

  useEffect(() => {
    if (show) {
      setClassesOutTimeout = setTimeout(() => {
        removeInStartAndAddInEndClass(
          el.current,
          !contentHeight ? inStart : getInStartClass(forwardRef, contentHeight),
          !contentHeight ? inEnd : getInEndClass(forwardRef, contentHeight)
        );
      }, 1);
    }

    return () => {
      clearTimeout(setClassesOutTimeout);
    };
  }, [show]);

  function handleDocumentClick(event: MouseEvent) {
    if (
      forwardRef?.current &&
      forwardRef.current.contains(event.target as Node)
    ) {
      return;
    }
    onClose && onClose();
  }

  return (
    <>
      {show && (
        <div
          data-testid="ACTransitionRoot"
          style={{ transition: `all ${time}ms` }}
          className={`ACTransition ${
            !contentHeight
              ? inStart
              : getInStartClass(forwardRef, contentHeight)
          } ${className || ""}`}
          tabIndex={1}
          ref={el}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ACTransition;
