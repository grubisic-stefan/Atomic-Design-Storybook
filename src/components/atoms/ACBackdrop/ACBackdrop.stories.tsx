import React, { useCallback } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACBackdrop from "./ACBackdrop";

export default {
  title: "Atoms/ACBackdrop",
  component: ACBackdrop,
} as ComponentMeta<typeof ACBackdrop>;

const Template: ComponentStory<typeof ACBackdrop> = () => {
  const dummyFunction = useCallback(() => {
    return "dummy";
  }, []);
  return <ACBackdrop onClose={dummyFunction} />;
};

export const Primary = Template.bind({});
Primary.args = {};
