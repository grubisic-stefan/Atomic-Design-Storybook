import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MdVerifiedUser } from "react-icons/md";

import Chip from "./Chip";
import Avatar from "../Avatar/Avatar";

export default {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => {
  return <Chip {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: "label",
  leftIcon: <Avatar bgColor="green">NF</Avatar>,
  rightIcon: <MdVerifiedUser />,
  onLeftIconClick() {
    console.log("left icon click");
  },
  onRightIconClick() {
    console.log("right icon click");
  },
  onClick() {
    console.log("click");
  },
};
