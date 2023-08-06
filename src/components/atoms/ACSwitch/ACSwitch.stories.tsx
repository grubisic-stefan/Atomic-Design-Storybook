import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACSwitch from "./ACSwitch";

export default {
  title: "atoms/ACSwitch",
  component: ACSwitch,
} as ComponentMeta<typeof ACSwitch>;

const Template: ComponentStory<typeof ACSwitch> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <ACSwitch
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        console.log(e.target.checked);
      }}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  size: "lg",
};
