import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MdVerifiedUser } from "react-icons/md";

import ACChip from "./ACChip";
import ACAvatar from "../ACAvatar/ACAvatar";

export default {
  title: "Atoms/ACChip",
  component: ACChip,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof ACChip>;

const Template: ComponentStory<typeof ACChip> = (args) => {
  return <ACChip {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: "label",
  leftIcon: <ACAvatar bgColor="green">NF</ACAvatar>,
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
