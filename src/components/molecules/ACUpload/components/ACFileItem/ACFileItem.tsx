import React, { useCallback, useState } from "react";
import { FaEye, FaTrash, FaFilePdf, FaImage, FaVideo } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { ACButton } from "../../../../atoms";
import { ACFileItemPropsT, DefaultValueT } from "../../Types";

const ACFileItem = ({
  file,
  setItemModal,
  defaultValue,
  type,
  style,
  disableDeleteDefault,
  onDeleteDefault,
  deleteUploaded,
}: ACFileItemPropsT) => {
  const handleDeleteItem = (e: React.MouseEvent) => {
    if (onDeleteDefault) return onDeleteDefault();
    if (deleteUploaded) return deleteUploaded(e);
  };

  const handleViewItem = () => {
    setItemModal(file || defaultValue);
  };
  return (
    <div role="ACUploadsListItem" style={style} className="ACFile-Item-Wrapper">
      <li
        style={style}
        className="ACFile-Item"
        key={file?.name || defaultValue?.id}
        data-testid={`ACFile-${file?.name || defaultValue?.id}`}
      >
        <div className="ACFile-Buttons">
          {(type == "pdf" || type == "image") && (
            <ACButton
              className="ACFile-Item-Button"
              iconButton
              children={<FaEye />}
              data-testid={`ACFile-View-Button-${
                file?.name || defaultValue?.id
              }`}
              onClick={handleViewItem}
            />
          )}
          {!disableDeleteDefault && (
            <ACButton
              className="ACFile-Item-Button "
              iconButton
              children={<FaTrash />}
              data-testid={`ACFile-Delete-Button-${
                file?.name || defaultValue?.id
              }`}
              onClick={handleDeleteItem}
            />
          )}
        </div>
        {type === "video" && (
          <div className="ACFile-Item-Image">
            <FaVideo className="ACFile-Item-Image-Logo" />
          </div>
        )}

        {type === "image" && (
          <div className="ACFile-Item-Image">
            <img
              src={file ? URL.createObjectURL(file) : defaultValue?.url}
              className="ACFile-Item-Image-Logo"
            />
          </div>
        )}
        {type === "pdf" && (
          <div className="ACFile-Item-Image">
            <FaFilePdf className="ACFile-Item-Image-Logo" />
          </div>
        )}
        {type === "file" && (
          <div className="ACFile-Item-Image">
            <AiFillFile className="ACFile-Item-Image-Logo" />
          </div>
        )}
      </li>
    </div>
  );
};

export default ACFileItem;
