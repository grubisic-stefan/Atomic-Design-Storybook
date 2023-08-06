import React, { useCallback, useState } from "react";
import ACFileItem from "../ACFileItem/ACFileItem";
import { ACUploadListPropsT, DefaultValueT } from "../../Types";
import { ACModal } from "../../../../atoms";
import { defaultValue } from "../../../../organisms/ACTimePicker/ACTimePicker.stories";

const ACUploadsList = ({
  files,
  defaultValue,
  setFiles,
  multiple,
  type,
  name,
  disabled,
  disableDeleteDefault,
  modalStyle,
  style,
  onDeleteDefault,
  onChange,
}: ACUploadListPropsT) => {
  const [itemModal, setItemModal] = useState<null | File | DefaultValueT>(null);
  const resetModal = () => setItemModal(null);

  const deleteUploadedFileHandle = useCallback(
    (e: React.MouseEvent, index: string | number | null) => {
      if (multiple) {
        const copyArray = [...(files as File[])];
        copyArray.splice(index as number, 1);
        setFiles(copyArray);
        onChange &&
          onChange(
            {
              ...e,
              ac: {
                value: copyArray as File[],
                name,
                event: "Delete Uploaded File",
              },
            },
            copyArray as File[]
          );
        return;
      }
      setFiles([]);
      onChange &&
        onChange(
          {
            ...e,
            ac: {
              value: [],
              name,
              event: "Delete Uploaded File",
            },
          },
          []
        );
    },
    [files]
  );
  const deleteDefaultHandle = useCallback((id: string) => {
    onDeleteDefault && onDeleteDefault(id);
  }, []);
  return (
    <>
      {!multiple && defaultValue && files?.length == 0 && (
        <ACFileItem
          style={style}
          setItemModal={setItemModal}
          defaultValue={defaultValue as DefaultValueT}
          type={type}
          disableDeleteDefault={disableDeleteDefault}
          disabled={disabled}
          onDeleteDefault={() =>
            deleteDefaultHandle((defaultValue as DefaultValueT).id as string)
          }
        />
      )}
      {multiple && defaultValue && (
        <>
          {(defaultValue as DefaultValueT[]).map((file) => (
            <ACFileItem
              style={style}
              key={file.id}
              setItemModal={setItemModal}
              defaultValue={file}
              type={type}
              disableDeleteDefault={disableDeleteDefault}
              disabled={disabled}
              onDeleteDefault={() => deleteDefaultHandle(file.id as string)}
            />
          ))}
        </>
      )}
      {!multiple && files?.length != 0 && (
        <ACFileItem
          style={style}
          setItemModal={setItemModal}
          file={(files as File[])[0]}
          setFiles={setFiles}
          type={type}
          disabled={disabled}
          deleteUploaded={(e: React.MouseEvent) =>
            deleteUploadedFileHandle(e, null)
          }
        />
      )}
      {multiple && files?.length != 0 && (
        <>
          {(files as File[]).map((file, index) => (
            <ACFileItem
              style={style}
              key={file.name}
              setItemModal={setItemModal}
              file={file}
              setFiles={setFiles}
              type={type}
              disabled={disabled}
              deleteUploaded={(e: React.MouseEvent) =>
                deleteUploadedFileHandle(e, index)
              }
            />
          ))}
        </>
      )}

      {itemModal && (
        <ACModal
          isShow={itemModal ? true : false}
          onClose={resetModal}
          children={
            <div
              style={modalStyle?.contentWrapper}
              className="ACFile-Item-Image-Modal"
            >
              <h2 style={modalStyle?.heading}>
                {(itemModal as File)?.name || type}
              </h2>
              {/* {type=="video"&& (
                <video
                  className="ACFile-Item-Image"
                  src={URL.createObjectURL(itemModal)}
                  controls
                ></video>
              )} */}
              {type == "image" && (
                <img
                  style={modalStyle?.image}
                  className="ACFile-Item-Image"
                  src={
                    (itemModal as DefaultValueT)?.url
                      ? (itemModal as DefaultValueT)?.url
                      : URL.createObjectURL(itemModal as File)
                  }
                ></img>
              )}
              {type == "pdf" && (
                <iframe
                  style={modalStyle?.iframePdf}
                  src={
                    (itemModal as DefaultValueT)?.url
                      ? (itemModal as DefaultValueT)?.url
                      : URL.createObjectURL(itemModal as File)
                  }
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                ></iframe>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default ACUploadsList;
