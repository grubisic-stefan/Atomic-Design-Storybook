import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACTabs from "./ACTabs";

export default {
  title: "Organisms/ACTabs",
  component: ACTabs,
} as ComponentMeta<typeof ACTabs>;

const Template: ComponentStory<typeof ACTabs> = (args) => <ACTabs {...args} />;
const tabs = [
  {
    id: 0,
    label: "Users",
    content: "Tab 1 content",
  },
  {
    id: 1,
    label: "Clients",
    content: "Tab 2 content",
  },
];
export const Default = Template.bind({});
Default.args = {
  tabs: tabs,
};
