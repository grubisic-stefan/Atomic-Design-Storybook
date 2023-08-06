import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACTransition from "./ACTransition";

export default {
  title: "Atoms/ACTransition",
  component: ACTransition,
  argTypes: { onClick: { action: "onClick" } },
} as ComponentMeta<typeof ACTransition>;

const Template: ComponentStory<typeof ACTransition> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>toggle</button>
      <ACTransition
        isShow={show}
        inStart="is"
        inEnd="ie"
        outStart="os"
        outEnd="oe"
        time={1000}
        onClose={() => {
          setShow(false);
        }}
      >
        <div style={{ width: 100, height: 100, backgroundColor: "red" }}></div>
      </ACTransition>
    </>
  );
};
const TemplateMenu: ComponentStory<typeof ACTransition> = (args) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button onClick={() => setShowMenu((prev) => !prev)}>toggle</button>

      <ACTransition
        isShow={showMenu}
        inStart="is1"
        inEnd="ie1"
        outStart="os1"
        outEnd="oe1"
        time={300}
        onClose={() => {
          setShowMenu(false);
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#eaeaea",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <a href="#">User</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </div>
      </ACTransition>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  inStart: "is",
  inEnd: "ie",
  outStart: "os",
  outEnd: "oe",
};
export const Menu = TemplateMenu.bind({});
Primary.args = {
  inStart: "is",
  inEnd: "ie",
  outStart: "os",
  outEnd: "oe",
};
