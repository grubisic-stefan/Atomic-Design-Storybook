import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACInput from "./ACInput";

export default {
  title: "Atoms/ACInput",
  component: ACInput,
  argTypes: {
    addonBefore: { control: "text" },
    addonAfter: { control: "text" },
    prefix: { control: "text" },
    suffix: { control: "text" },
  },
} as ComponentMeta<typeof ACInput>;

const Template: ComponentStory<typeof ACInput> = (args) => {
  const [value, setValue] = useState<string | undefined | number>("");
  return (
    <ACInput
      {...args}
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
};
export const Default = Template.bind({});
Default.args = {};

export const EveryProp = Template.bind({});
EveryProp.args = {
  id: "id",
  label: "Label Text",
  placeholder: "Placeholder Text",
  allowClear: true,
  addonBefore: "https://",
  addonAfter: ".com",
  prefix: "https://",
  suffix: ".com",
  helperText: "Helper Text",
  onEnterPress: () => console.log("Enter Pressed"),
};

export const LabelAndPlaceholder = Template.bind({});
LabelAndPlaceholder.args = {
  id: "id",
  label: "Label Text",
  placeholder: "Placeholder Text",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const HelperText = Template.bind({});
HelperText.args = {
  helperText: "Helper Text",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const AllowClear = Template.bind({});
AllowClear.args = {
  value: "Initial Value",
  allowClear: true,
};

export const AddonBeforeAndAfter = Template.bind({});
AddonBeforeAndAfter.args = {
  addonBefore: "https://",
  addonAfter: ".com",
};

export const PrefixAndSuffix = Template.bind({});
PrefixAndSuffix.args = {
  prefix: "www.",
  suffix: ".com",
};

export const MaxLength = Template.bind({});
MaxLength.args = {
  maxLength: 10,
  showCount: true,
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
};

export const TextArea = Template.bind({});
TextArea.args = {
  isTextArea: true,
};
