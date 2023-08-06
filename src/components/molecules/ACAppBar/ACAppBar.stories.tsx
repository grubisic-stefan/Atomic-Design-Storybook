import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACAppBar from "./ACAppBar";
import ACMenuBtn from "../../atoms/ACMenuBtn/ACMenuBtn";

export default {
  title: "Molecules/ACAppBar",
  component: ACAppBar,
  argTypes: { handleClick: { action: "handleClick" } },
} as ComponentMeta<typeof ACAppBar>;

const Template: ComponentStory<typeof ACAppBar> = (args) => {
  return (
    <ACAppBar
    {...args}
      style={{
        display: "flex",
      }}
    >
      <ACMenuBtn></ACMenuBtn>
    </ACAppBar>
  );
};

export const Primary = Template.bind({});
Primary.args = { boxShadow: true,};
