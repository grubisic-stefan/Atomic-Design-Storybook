import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACLoading from "./ACLoading";

export default {
  title: "Atoms/ACLoading",
  component: ACLoading,
} as ComponentMeta<typeof ACLoading>;

const Template: ComponentStory<typeof ACLoading> = (args) => {
  return (
    <ACLoading {...args}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "100px",
          border: "1px solid gray",
        }}
      >
        <h1> Some content </h1>
      </div>
    </ACLoading>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  loadingElement: (
    <img
      width="150px"
      src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
    />
  ),
};
