import React, { useEffect, useState } from "react";
import ACUploadInput from "./components/ACUploadInput/ACUploadInput";
import ACUploadsList from "./components/ACUploadsList/ACUploadsList";
import { ACUploadPropsT } from "./Types";
import { UploadWrapper } from "./styled/UploadWrapper";

const ACUpload = ({
  multiple,
  type,
  color = "tasty",
  defaultValue,
  disabled = false,
  blacklist = [],
  disableDeleteDefault,
  isSmall = false,
  name,
  label = "",
  icon = "",
  key = "",
  firstInOrder = "list",
  limitSize,
  classNames = {
    modal: "",
    wrapper: "",
  },
  limitFiles,
  selectedItemStyle,
  styled = {
    wrapper: {
      background: "",
      width: "",
      height: "",
      mainColor: "",
      mainColorLowerOpacity: "",
      backgroundLowerOpacity: "",
      backgroundHigherOpacity: "",
    },
    listContainer: {
      width: "",
      height: "",
      textButton: false,
    },
    listItem: {
      width: "",
      height: "",
    },
  },
  onChange,
  onDeleteDefault,
  orientation = "horizontal",
  uploadButtonStyle,
}: ACUploadPropsT) => {
  const [files, setFiles] = useState([]);

  return (
    <UploadWrapper
      key={key}
      className={`ACUpload-wrapper ${classNames.wrapper}`}
      dataset={{ color, disabled, orientation }}
      role="ACUpload"
      styled={{ ...styled, firstInOrder }}
    >
      <ACUploadInput
        disabled={disabled}
        multiple={multiple}
        files={files}
        name={name}
        setFiles={setFiles}
        onChange={onChange}
        blacklist={blacklist}
        isSmall={isSmall}
        limitSize={limitSize}
        limitFiles={limitFiles}
        onDeleteDefault={onDeleteDefault}
        defaultValue={defaultValue}
        style={uploadButtonStyle}
        label={label}
        icon={icon}
      />
      {(files || defaultValue) && (
        <ACUploadsList
          disableDeleteDefault={disableDeleteDefault}
          files={files}
          defaultValue={defaultValue}
          setFiles={setFiles}
          multiple={multiple}
          type={type}
          disabled={disabled}
          onDeleteDefault={onDeleteDefault}
          onChange={onChange}
          style={selectedItemStyle}
        />
      )}
    </UploadWrapper>
  );
};

export default ACUpload;
