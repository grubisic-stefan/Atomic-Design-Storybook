import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACUpload from "./ACUpload";
import { FaInstagram } from "react-icons/fa";
export default {
  title: "molecules/ACUpload",
  component: ACUpload,
} as ComponentMeta<typeof ACUpload>;
const Single: ComponentStory<typeof ACUpload> = (args) => {
  const [values, setValues] = useState([]);

  return (
    <ACUpload
      {...args}
      type="image"
      defaultValue={{
        id: "1",
        url: "data:image/jpeg;base64,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",
      }}
      onChange={(e: any, files) => console.log(files)}
    />
  );
};
export const single = Single.bind({});

const Multiple: ComponentStory<typeof ACUpload> = (args) => (
  <ACUpload
    {...args}
    multiple
    type="image"
    limitFiles={3}
    onChange={(e: any, files) => console.log(files)}
  />
);
export const multiple = Multiple.bind({});
const Disabled: ComponentStory<typeof ACUpload> = (args) => (
  <ACUpload
    onChange={(e: any, files) => console.log(files)}
    {...args}
    disabled
  />
);
export const disabled = Disabled.bind({});
const Orientation: ComponentStory<typeof ACUpload> = (args) => (
  <div style={{ width: "140px" }}>
    <ACUpload {...args} orientation="vertical" />
  </div>
);
export const orientation = Orientation.bind({});
const Styled: ComponentStory<typeof ACUpload> = (args) => (
  <ACUpload {...args} color="custom" icon={<FaInstagram />} />
);
export const styled = Styled.bind({});
const ImagePaths: ComponentStory<typeof ACUpload> = (args) => {
  const [values, setValues] = useState([]);
  const onChangeHandler = (value: any) => {
    setValues(value);
  };
  return (
    <ACUpload
      {...args}
      onChange={onChangeHandler}
      multiple
      blacklist={[
        "application/pdf",
        "docx",
        "application",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]}
    />
  );
};
export const imagePaths = ImagePaths.bind({});
const SingleDefaultUpload: ComponentStory<typeof ACUpload> = (args) => {
  const [values, setValues] = useState([]);
  const onChangeHandler = (value: any) => {
    setValues(value);
  };
  return (
    <ACUpload
      {...args}
      onChange={onChangeHandler}
      blacklist={[
        "application/pdf",
        "docx",
        "application",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]}
    />
  );
};
export const singleDefaultUpload = SingleDefaultUpload.bind({});
const LimitedUploads: ComponentStory<typeof ACUpload> = (args) => {
  const [values, setValues] = useState([]);
  const onChangeHandler = (value: any) => {
    setValues(value);
  };
  return (
    <ACUpload
      {...args}
      onChange={onChangeHandler}
      blacklist={[
        "application/pdf",
        "docx",
        "application",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]}
      multiple
    />
  );
};
export const limitedUploads = LimitedUploads.bind({});
const SingleDefaultUploadKey: ComponentStory<typeof ACUpload> = (args) => {
  const [values, setValues] = useState([]);
  const [key, setKey] = useState("Key");
  const onChangeHandler = (value: any) => {
    setValues(value);
  };
  setTimeout(() => {
    setKey("Key2");
  }, 2000);
  return (
    <ACUpload
      {...args}
      onChange={onChangeHandler}
      key={key}
      blacklist={[
        "application/pdf",
        "docx",
        "application",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]}
    />
  );
};
export const singleDefaultUploadKey = SingleDefaultUploadKey.bind({});
