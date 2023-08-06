import { ACFile } from "../Types";

export const validFileType = (
  file: File,
  blacklist: string[],
  setMessageModal: React.Dispatch<React.SetStateAction<boolean | string>>,
  validationFiles: any,
  defaultValue: any,
  files?: ACFile[],
  limitSize?: {
    size: number;
    unit: "MB" | "KB" | "GB";
  },
  limitFiles?: number
) => {
  if (blacklist.includes(file.type)) return false;

  if (limitFiles) {
    if (
      ((files as ACFile[]) || []).length +
        validationFiles?.length +
        (defaultValue || []).length ===
      limitFiles
    ) {
      setMessageModal(`You can upload only ${limitFiles} file`);
      return false;
    }
  }
  if (limitSize) {
    const { size, unit } = limitSize as { size: number; unit: string };
    const fileSize = file.size;
    const fileSizeInMB = fileSize / 1024 / 1024;

    const convertSize =
      unit == "KB" ? size / 1024 : unit == "GB" ? size * 1024 : size;

    if (fileSizeInMB > convertSize) {
      setMessageModal(`File size must be less than ${size} ${unit}`);
      return false;
    }
  }

  return true;
};
