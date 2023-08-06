import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACDigitalMinutesPicker from "./ACDigitalMinutesPicker";
export default {
  title: "Atoms/ACDigitalMinutesPicker",
  component: ACDigitalMinutesPicker,
} as ComponentMeta<typeof ACDigitalMinutesPicker>;

const Template: ComponentStory<typeof ACDigitalMinutesPicker> = (args) => (
  <ACDigitalMinutesPicker {...args} />
);

export const timePicker = Template.bind({});
timePicker.args = {
  MM: 0,
  className: "minuteStep",
  style: {
    digitalMinuteWrap: {
      width: "45%",
    },
    digitalMinute: {
      width: "45%",
    },
  },
};
