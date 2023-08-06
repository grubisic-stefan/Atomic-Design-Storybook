import React, { CSSProperties, FC, ReactNode, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ACButton from "../ACButton";
import Snackbar from "./styled/Snackbar";

export interface ACSnackbarProps {
  icon?: ReactNode;
  text: ReactNode;
  open: boolean;
  style?: {
    container?: CSSProperties;
    icon?: CSSProperties;
    text?: CSSProperties;
    closeIcon?: CSSProperties;
  };
  onClose: () => void;
  type?: "primary" | "secondary" | "success" | "error";
  autoHideDuration?: number;
  position?:
    | "top-center"
    | "top-right"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "top-left";
}

const ACSnackbar: FC<ACSnackbarProps> = ({
  icon,
  text,
  open,
  onClose,
  style = {
    container: {},
    icon: {},
    text: {},
    closeIcon: {},
  },
  type = "primary",
  autoHideDuration = 5000,
  position = "bottom-center",
}) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (open) {
      timeout = setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }

    return () => clearTimeout(timeout);
  }, [open]);

  if (open) {
    return (
      <Snackbar
        data-testid={"ACSnackbar"}
        className={`ACSnackbar ACSnackbar-${position} ACSnackbar-${type}`}
        style={style?.container}
      >
        {icon && <span style={style?.icon}>{icon}</span>}
        <p style={style?.text}>{text}</p>
        <ACButton iconButton style={style?.closeIcon} variant="text">
          <AiOutlineCloseCircle onClick={onClose} />
        </ACButton>
      </Snackbar>
    );
  }

  return <></>;
};

export default ACSnackbar;
