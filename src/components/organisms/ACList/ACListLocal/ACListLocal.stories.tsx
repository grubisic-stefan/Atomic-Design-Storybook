import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACListLocal from "./ACListLocal";
import { MdAdd, MdInfo, MdDelete, MdEdit } from "react-icons/md";

export default {
  title: "Organisms/ACListLocal",
  component: ACListLocal,
} as ComponentMeta<typeof ACListLocal>;

const Template: ComponentStory<typeof ACListLocal> = (args) => (
  <ACListLocal {...args} />
);

const returnActionForSonar = (icon: ReactNode, onClick: () => void) => {
  return {
    icon,
    onClick,
  };
};

export const Primary = Template.bind({});
Primary.args = {
  headerTitle: "List local",
  allItems: [
    { id: "1", title: "Title 1", description: "Description 1" },
    { id: "2", title: "Title 2", description: "Description 2" },
    { id: "3", title: "Title 3", description: "Description 3" },
    { id: "4", title: "Title 4", description: "Description 4" },
    { id: "5", title: "Title 5", description: "Description 5" },
    { id: "6", title: "Title 6", description: "Description 6" },
  ],

  headerActions: [
    returnActionForSonar(<MdAdd />, () => {
      console.log("ADD");
    }),
    returnActionForSonar(<MdInfo />, () => {
      console.log("INFO");
    }),
  ],
  actions: [
    returnActionForSonar(<MdDelete />, () => {
      console.log("DELETE");
    }),
    returnActionForSonar(<MdEdit />, () => {
      console.log("EDIT");
    }),
  ],
};
