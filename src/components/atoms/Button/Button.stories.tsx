import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>Button</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => alert("Button clicked"),
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  onClick: () => alert("Button clicked"),
  leftIcon: <FaArrowLeft />,
  rightIcon: <FaArrowRight />,
  color: "secondary",
};
