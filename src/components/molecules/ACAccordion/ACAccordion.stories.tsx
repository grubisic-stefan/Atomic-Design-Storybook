import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./ACAccordion.scss";

import ACAccordion from "./ACAccordion";

export default {
  title: "molecules/ACAccordion",
  component: ACAccordion,
} as ComponentMeta<typeof ACAccordion>;

const Template: ComponentStory<typeof ACAccordion> = (args) => (
  <ACAccordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  maxOneVisible: true,
  items: [
    {
      title: "Accordion title 1",
      data: (
        <div style={{ backgroundColor: "orange", padding: "10px" }}>
          <p>This is some custom accordion description 1</p>
        </div>
      ),
      disabled: true,
    },
    {
      title: "Accordion title 2",
      data: (
        <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
          <p>This is some custom accordion description 2</p>
        </div>
      ),
    },
    {
      title: "Accordion title 3",
      data: (
        <div style={{ backgroundColor: "lightgreen", padding: "10px" }}>
          <p>This is some custom accordion description 3</p>
        </div>
      ),
    },
  ],
};
