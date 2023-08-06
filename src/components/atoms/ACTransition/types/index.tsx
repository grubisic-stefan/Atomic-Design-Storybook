import { ReactElement } from "react";
import { Dropdown } from "../../../molecules/ACAutocompleteV2/styled/Dropdown";

export type ACTransitionT = {
  children: ReactElement | ReactElement[];
  inStart?: string;
  inEnd?: string;
  outStart?: string;
  outEnd?: string;
  isShow: boolean;
  time: number;
  className?: string;
  forwardRef?: React.RefObject<HTMLDivElement>;
  onClose?: () => void;
  contentHeight?: number;
  dropdown?: boolean;
};

export type TimeOutVariableT = NodeJS.Timeout | undefined;
