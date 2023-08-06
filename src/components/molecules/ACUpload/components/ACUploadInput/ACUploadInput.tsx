import React, { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { ACButton, ACModal } from "../../../../atoms";
import { validFileType } from "../../Helper";
import { ACUploadInputT } from "../../Types";
import { InputWrapper } from "../../../ACAutocompleteV2/styled/InputWrapper";

const ACUploadInput = ({
  setFiles,
  multiple,
  disabled,
  isSmall,
  files,
  blacklist = [],
  limitSize,
  limitFiles,
  label,
  icon,
  onChange,
  name,
  style,
  defaultValue,
}: ACUploadInputT) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [messageModal, setMessageModal] = useState<boolean | string>(false);
  const removeStyle = () => setStyleData(false);
  const revertStyle = (e: any) => {
    e.preventDefault();
    removeStyle();
  };
  const [styleData, setStyleData] = useState(false);

  const checkIfFileUploaded = (file: File, validationFiles: any) => {
    if (
      !validFileType(
        file,
        blacklist,
        setMessageModal,
        validationFiles,
        defaultValue,
        files,
        limitSize,
        limitFiles
      )
    )
      return false;
    const index = files?.findIndex(
      (element) =>
        element.name === file.name && file.lastModified === element.lastModified
    );
    if (index !== -1 && index !== undefined) return false;
    return true;
  };

  const handleAddItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const uploadedFiles: any = e.target.files;
      let validationFiles: File[] = [];

      // CLEAR FILES IN INPUT
      const dt = new DataTransfer();
      inputRef.current!.files = dt.files;

      if (!multiple) {
        const file = uploadedFiles[0];
        if (!checkIfFileUploaded(file, validationFiles)) return;
        validationFiles = file;
      } else {
        [...uploadedFiles].forEach((file) => {
          if (!checkIfFileUploaded(file, validationFiles)) return;
          validationFiles.push(file);
        });
        validationFiles = [
          ...((files as File[]) || []),
          ...(validationFiles as File[]),
        ];
      }

      if (validationFiles.length === 0) return;

      setFiles(multiple ? validationFiles : [validationFiles]);
      onChange &&
        onChange(
          {
            ...e,
            ac: {
              value: validationFiles,
              name,
              type: "ACUpload",
              event: "uploadFile",
            },
          },
          validationFiles
        );
    }
  };
  const handleDragOver = (e: React.MouseEvent) => {
    if (!disabled) {
      e.preventDefault();
      setStyleData(true);
    }
  };
  const handleDrop = (e: any) => {
    if (!disabled) {
      e.preventDefault();
      let validationFiles: File[] = [];
      if (multiple) {
        const uploadedFiles = e.dataTransfer.files;
        [...uploadedFiles].forEach((file) => {
          if (!checkIfFileUploaded(file, validationFiles)) return;
          validationFiles.push(file);
        });
        validationFiles = [
          ...((files as File[]) || []),
          ...(validationFiles as File[]),
        ];
      } else {
        const file = e.dataTransfer.files[0];
        if (!checkIfFileUploaded(file, validationFiles)) return;
        validationFiles = file;
      }
      setFiles(multiple ? validationFiles : [validationFiles]);
      onChange &&
        onChange(
          {
            ...e,
            ac: {
              value: validationFiles,
              name,
              type: "ACUpload",
              event: "uploadFile",
            },
          },
          validationFiles
        );
      removeStyle();
    }
  };
  return (
    <>
      <div
        className={"ACUploadInput-container"}
        role={`${
          disabled ? "ACUploadInput-disabled" : "ACUploadInput-enabled"
        }`}
        data-disabled={`${disabled ? "true" : "false"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={revertStyle}
        onDragLeave={revertStyle}
        data-hover-drop={styleData}
        style={style}
      >
        <div className="ACUploadInput-input" style={style}>
          <ACButton variant="text">
            {icon || <FaImages className="ACUpload-input-image-input" />}
            <p>{label}</p>
          </ACButton>
          <input
            ref={inputRef}
            data-testid="ACUploadInput-upload"
            type="file"
            multiple
            onChange={handleAddItem}
            disabled={disabled}
          />
        </div>
      </div>

      <ACModal
        isShow={messageModal ? true : false}
        className={`ACFile-Modal ${"className"}`}
        onClose={() => setMessageModal(false)}
        transition="fade"
        children={
          <div className="ACFile-Item-Delete-Modal">
            <div className="ACFile-Item-Delete-Modal-Info-Wrapper">
              <div>
                <div className="ACFile-Item-Delete-Modal-Icon">
                  <AiOutlineWarning size={30} color="#d03737" />
                </div>

                <div>
                  <div>Warning</div>
                  <div>{messageModal}</div>
                </div>
              </div>
            </div>
            <div className="ACFile-Item-Delete-Modal-Buttons">
              <ACButton variant="text" onClick={() => setMessageModal(false)}>
                Ok
              </ACButton>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ACUploadInput;
