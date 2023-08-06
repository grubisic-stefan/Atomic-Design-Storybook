import React, { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACModal from "./ACModal";

export default {
  title: "Atoms/ACModal",
  component: ACModal,
  argTypes: { handleClick: { action: "handleClick" } },
} as ComponentMeta<typeof ACModal>;

const Template: ComponentStory<typeof ACModal> = (args) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal((prev) => !prev)}>Show Modal</button>
      <ACModal
        {...args}
        isShow={showModal}
        onClose={() => setShowModal((prev) => !prev)}
      >
        <div
          style={{ width: "350px", height: "150px", backgroundColor: "red" }}
        ></div>
      </ACModal>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
