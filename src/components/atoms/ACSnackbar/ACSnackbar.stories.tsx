import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import ACSnackbar from "./ACSnackbar";
import ACButton from "../ACButton";
import { FaAddressBook } from "react-icons/fa";

export default {
  title: "Atoms/ACSnackbar",
  component: ACSnackbar,
} as ComponentMeta<typeof ACSnackbar>;

const Template: ComponentStory<typeof ACSnackbar> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ACButton onClick={() => setOpen(true)}> Show modal </ACButton>
      <ACSnackbar
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        icon={<FaAddressBook />}
      />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  type: "success",
  text: "Snackbar view",
};

export const Error = Template.bind({});
Error.args = {
  type: "error",
  text: "Snackbar view",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  text: "Snackbar view",
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  text: "Snackbar view",
};

export const Styled = Template.bind({});
Styled.args = {
  type: "success",
  style: {
    closeIcon: {
      color: "black",
      display: "none",
    },
    text: {
      color: "black",
    },
    icon: { color: "blue" },
    container: {
      background: "white",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "200px",
      fontSize: "0.7rem",
    },
  },
  text: (
    <div>
      <p>You have registered </p>
      <p>Congrats on successfull registration</p>
    </div>
  ),
};
