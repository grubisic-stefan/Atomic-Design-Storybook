import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACDigitalHourSelect from "./ACDigitalHourSelect";
export default {
  title: "Atoms/ACDigitalHourSelect",
  component: ACDigitalHourSelect,
} as ComponentMeta<typeof ACDigitalHourSelect>;

const Template: ComponentStory<typeof ACDigitalHourSelect> = (args) => (
  <ACDigitalHourSelect {...args} />
);

export const timePicker = Template.bind({});
timePicker.args = {
  className: "minuteStep",
  style: {
    digitalHourWrap: {
      width: "45%",
    },
    digitalHour: {
      width: "45%",
    },
  },
};
