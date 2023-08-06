import React, { ReactElement } from "react";

import ACBackdrop from "../ACBackdrop/ACBackdrop";
import ACTransition from "../ACTransition";

import { transitionType } from "./helper";

import { ACModalPropT } from "./types";

import "./ACModal.scss";

const ACModal = ({
  children,
  isShow,
  onClose,
  transition = "fade",
  className,
}: ACModalPropT) => {
  return (
    <>
      {isShow && (
        <ACBackdrop
          onClose={() => {
            onClose();
          }}
        />
      )}
      <ACTransition
        className={`ACModal__content-wrap ${className}`}
        isShow={isShow}
        time={200}
        {...transitionType(transition)}
      >
        {children}
      </ACTransition>
    </>
  );
};

export default ACModal;
