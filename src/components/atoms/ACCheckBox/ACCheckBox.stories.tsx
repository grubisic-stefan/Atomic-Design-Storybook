import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACCheckBox from "./ACCheckBox";

export default {
  title: "Atoms/ACCheckBox",
  component: ACCheckBox,
} as ComponentMeta<typeof ACCheckBox>;

const Template: ComponentStory<typeof ACCheckBox> = (args) => (
  <ACCheckBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  checked: true,
};
