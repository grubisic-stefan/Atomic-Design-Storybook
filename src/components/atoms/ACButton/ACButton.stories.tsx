import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import ACButton from "./ACButton";

export default {
  title: "Atoms/ACButton",
  component: ACButton,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof ACButton>;

const Template: ComponentStory<typeof ACButton> = (args) => {
  const buttonRef = useRef({} as HTMLButtonElement);

  return (
    <ACButton {...args} ref={buttonRef}>
      Button
    </ACButton>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  onClick: () => alert("Button clicked"),
  leftIcon: <FaArrowLeft />,
  rightIcon: <FaArrowRight />,
  color: "primary",
};
