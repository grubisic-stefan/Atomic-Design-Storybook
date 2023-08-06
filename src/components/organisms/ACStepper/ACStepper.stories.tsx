import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACStepper from "./ACStepper";

export default {
  title: "Organisms/ACStepper",
  component: ACStepper,
} as ComponentMeta<typeof ACStepper>;

const DUMMY_DATA = [
  {
    label: "Novi Sad",
    content: <div style={{ padding: "50px" }}>"Novi Sad"</div>,
  },
  {
    label: "Zmajevo",
    content: <div style={{ padding: "50px" }}>"Zmajevo City"</div>,
  },
  {
    label: "Subotica",
    content: <div style={{ padding: "50px" }}>"Zmajevo"</div>,
  },
];

const Template: ComponentStory<typeof ACStepper> = (args) => (
  <ACStepper {...args} />
);

export const stepper = Template.bind({});
stepper.args = {
  content: DUMMY_DATA,
};
