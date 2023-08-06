import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACSpinner from "./ACSpinner";

export default {
  title: "Atoms/ACSpinner",
  component: ACSpinner,
} as ComponentMeta<typeof ACSpinner>;

const Template: ComponentStory<typeof ACSpinner> = (args) => {
  return <ACSpinner {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
