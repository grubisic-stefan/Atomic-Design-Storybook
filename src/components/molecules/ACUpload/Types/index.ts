import { CSSProperties, ReactNode } from "react";
import { ACEvenType } from "../../../../globalTypes";

export type DefaultValueT = {
  id?: string;
  url?: string;
};

export type ACUploadPropsT = {
  defaultValue?: DefaultValueT | DefaultValueT[];
  multiple: boolean;
  orientation?: "horizontal" | "vertical";
  imagePaths?: string[];
  disabled?: boolean;
  type: "image" | "pdf" | "video" | "file";
  blacklist?: string[];
  isSmall?: boolean;
  name?: string;
  label?: string;
  icon?: ReactNode;
  firstInOrder?: "upload" | "list";
  uploadButtonStyle?: CSSProperties;
  disableDeleteDefault?: boolean;
  selectedItemStyle?: CSSProperties;
  key?: string;

  classNames?: {
    modal: string;
    wrapper: string;
  };
  limitSize?: {
    size: number;
    unit: "MB" | "KB" | "GB";
  };
  limitFiles?: number;
  onDeleteDefault?: (id: string) => void;
  onChange?: (
    e: ACEvenType<
      React.ChangeEvent | React.MouseEvent,
      File | File[] | undefined
    >,
    files?: File[] | undefined
  ) => void;
  styled?: {
    wrapper?: {
      background?: string;
      width?: string;
      height?: string;
      mainColor?: string;
      mainColorLowerOpacity?: string;
      backgroundLowerOpacity?: string;
      backgroundHigherOpacity?: string;
    };
    listContainer?: {
      width?: string;
      height?: string;
      textButton?: boolean;
    };
    listItem?: {
      width?: string;
      height?: string;
    };
  };
  color?: "primary" | "secondary" | "tasty" | "custom";
};

export type ACFile = {
  lastModified?: any;
  name: string;
  size: any;
  type: any;
};

export type ACUploadInputT = {
  onChange?: (
    e: ACEvenType<
      React.ChangeEvent | React.MouseEvent,
      File | File[] | undefined
    >,
    files?: File[] | undefined
  ) => void;
  blacklist?: string[];
  files: ACFile[];
  setFiles: any;
  setSingleFile?: any;
  disabled?: boolean;
  multiple: boolean;
  isSmall: boolean;
  label?: string;
  icon?: ReactNode;
  style?: CSSProperties;
  limitSize?: {
    size: number;
    unit: "MB" | "KB" | "GB";
  };
  limitFiles?: number;
  onDeleteDefault?: (id: string) => void;

  name?: string;
  defaultValue?: DefaultValueT | DefaultValueT[];
};

export type ACFileItemPropsT = {
  file?: File;
  defaultValue?: DefaultValueT;
  setFiles?: any;
  setItemModal: any;
  type: "image" | "pdf" | "video" | "file";
  disabled?: boolean;
  style?: CSSProperties;
  onDeleteDefault?: () => void;
  disableDeleteDefault?: boolean;
  deleteUploaded?: (e: React.MouseEvent) => void;
};

export type ACUploadListPropsT = {
  files?: File[] | File;
  setFiles: any;
  disabled?: boolean;
  disableDeleteDefault?: boolean;
  multiple?: boolean;
  name?: string;
  style?: CSSProperties;
  modalStyle?: {
    contentWrapper?: CSSProperties;
    heading?: CSSProperties;
    image?: CSSProperties;
    iframePdf?: CSSProperties;
  };
  type: "image" | "pdf" | "video" | "file";
  defaultValue?: DefaultValueT | DefaultValueT[];
  onDeleteDefault?: (id: string) => void;
  onChange?: (
    e: ACEvenType<
      React.ChangeEvent | React.MouseEvent,
      File | File[] | undefined
    >,
    files?: File[] | undefined
  ) => void;
};
