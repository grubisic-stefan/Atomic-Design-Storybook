import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACToolTip from "./ACToolTip";

export default {
  title: "Atoms/ACToolTip",
  component: ACToolTip,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof ACToolTip>;

const Template: ComponentStory<typeof ACToolTip> = (args) => {
  return (
    <div style={{ margin: "100px" }}>
      <ACToolTip {...args}>
        <p
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: "label",
  style: {
    backgroundColor: "red",
    padding: "8px",
    borderRadius: "4px",
    color: "#fff",
  },
};
