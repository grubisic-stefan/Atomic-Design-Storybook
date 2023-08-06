import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FaUserAlt } from "react-icons/fa";

import ACDrawer from "./ACDrawer";

const DUMMY = [
  {
    title: "Link1",
    itemId: "1",
    type: "3443",
    match: "/user",
    icon: <FaUserAlt />,
    position: 1,
    hidden: true,
  },
  {
    title: "Link2",
    itemId: "1",
    type: "3443",
    match: "/user",
    icon: <FaUserAlt />,
    position: 1,
  },
  {
    title: "Link3",
    itemId: "1",
    type: "3443",
    match: "/user",
    icon: <FaUserAlt />,
    position: 1,
    items: [
      {
        title: "Sublink1",
        itemId: "1",
        type: "3443",
        match: "/user",
        icon: <FaUserAlt />,
        position: 1,
      },
      {
        title: "Sublink2",
        itemId: "1",
        type: "3443",
        match: "/user",
        icon: <FaUserAlt />,
        position: 1,
      },
    ],
  },
];

export default {
  title: "Organisms/ACDrawer",
  component: ACDrawer,
} as ComponentMeta<typeof ACDrawer>;

const Template: ComponentStory<typeof ACDrawer> = (args) => (
  <ACDrawer {...args} content={DUMMY} />
);

export const Primary = Template.bind({});
Primary.args = {
  header: ({ isShrink }: any) => {
    if (isShrink) return <div style={{ backgroundColor: "#FFF" }}>uros</div>;
    return <div style={{ backgroundColor: "red" }}>uros</div>;
  },
  className: "test",
};
