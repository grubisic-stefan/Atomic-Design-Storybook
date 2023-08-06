import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TextField from "./TextField";

export default {
  title: "Atoms/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Label = Template.bind({});
Label.args = {
  label: "Label",
  id: "test-id",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Placeholder",
  id: "test-id",
};

export const Lable_and_Placeholder = Template.bind({});
Lable_and_Placeholder.args = {
  placeholder: "Placeholder",
  label: "Label",
  id: "test-id",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "test-id",
  disabled: true,
  placeholder: "Placeholder",
  label: "Disabled",
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: "Outlined",
  variant: "outlined",
};

export const Filled = Template.bind({});
Filled.args = {
  label: "Filled",
  variant: "filled",
};

export const Standard = Template.bind({});
Standard.args = {
  label: "Standard",
  variant: "standard",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  label: "Full Width",
  fullWidth: true,
};

export const Password = Template.bind({});
Password.args = {
  label: "Password",
  type: "password",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary color",
  color: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  label: "Success color",
  color: "success",
};

export const ErrorColor = Template.bind({});
ErrorColor.args = {
  label: "Error color",
  color: "error",
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  label: "Default Value",
  defaultValue: "Lorem Ipsum",
};

export const HandleChange = Template.bind({});
HandleChange.args = {
  label: "Check the console",
  onChange: () => console.log("input has changed"),
};

export const ErrorProp = Template.bind({});
ErrorProp.args = {
  label: "Hello World",
  error: true,
};

export const HelperText = Template.bind({});
HelperText.args = {
  label: "Helper Text",
  helperText: "Enter your name",
};

export const Required = Template.bind({});
Required.args = {
  label: "Username",
  helperText: "Username is required",
  required: true,
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  label: "Username",
  autoFocus: true,
};
