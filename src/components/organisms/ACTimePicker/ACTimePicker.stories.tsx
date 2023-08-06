import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACTimePicker from "./ACTimePicker";
import { color } from "../../../utils/_globalVariables";
export default {
  title: "Organisms/ACTimePicker",
  component: ACTimePicker,
} as ComponentMeta<typeof ACTimePicker>;

const Template: ComponentStory<typeof ACTimePicker> = (args) => {
  const [value, setValue] = useState<string>();
  console.log(value);
  return (
    <div>
      <ACTimePicker
        {...args}
        color="red"
        value={value}
        onChange={(date) => {
          setValue(date);
        }}
      />

      <div
        style={{ height: "800px", width: "50px", backgroundColor: "green" }}
      ></div>
    </div>
  );
};

export const timePicker = Template.bind({});
timePicker.args = {};
export const defaultValue = Template.bind({});
defaultValue.args = {
  defaultValue: "01:00",
  onBlur: (e) => {
    console.log(e);
  },
  onChange: (date, e) => {
    console.log(date, e);
  },
};
