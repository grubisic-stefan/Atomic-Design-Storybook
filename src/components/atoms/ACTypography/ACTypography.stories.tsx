import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACTypography from "./ACTypography";

export default {
  title: "Atoms/ACTypography",
  component: ACTypography,
} as ComponentMeta<typeof ACTypography>;

const Template: ComponentStory<typeof ACTypography> = (args) => (
  <ACTypography {...args}>Heading {args.variant}</ACTypography>
);

export const Default = Template.bind({});
Default.args = {};

export const Heading1 = Template.bind({});
Heading1.args = {
  variant: "h1",
};

export const Heading2 = Template.bind({});
Heading2.args = {
  variant: "h2",
};

export const Heading3 = Template.bind({});
Heading3.args = {
  variant: "h3",
};

export const Heading4 = Template.bind({});
Heading4.args = {
  variant: "h4",
};

export const Heading5 = Template.bind({});
Heading5.args = {
  variant: "h5",
};

export const Heading6 = Template.bind({});
Heading6.args = {
  variant: "h6",
};

export const Body1 = Template.bind({});
Body1.args = {
  variant: "body1",
};

export const Body2 = Template.bind({});
Body2.args = {
  variant: "body2",
};

export const Caption = Template.bind({});
Caption.args = {
  variant: "caption",
};

export const Button = Template.bind({});
Button.args = {
  variant: "button",
};

export const Style = Template.bind({});
Style.args = {
  style: {
    color: "yellow",
    backgroundColor: "black",
    textAlign: "center",
    textTransform: "uppercase",
    padding: "16px 24px",
  },
};

export const Component = Template.bind({});
Component.parameters = {
  docs: {
    description: {
      story:
        "Changing the semantic element. For example, if there is already an h1 tag on the page, let's not duplicate it, change tag to something else, in this case change it into span but keep css classes for h1.",
    },
  },
};
Component.args = {
  variant: "h1",
  component: "span",
};
