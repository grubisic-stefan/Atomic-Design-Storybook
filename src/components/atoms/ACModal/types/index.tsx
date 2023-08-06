import { ReactElement } from "react";

export type ACModalPropT = {
  children: ReactElement | ReactElement[];
  isShow: boolean;
  onClose: () => void;
  transition?: "fade" | "fromTop" | "fromBottom";
  className?: string;
};
