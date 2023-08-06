import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import ACInput from "../../atoms/ACInput";
import ACAutocomplete from "./ACAutocomplete";

import { DUMMY_DATA } from "../../../utils/mockData/movies";

export default {
  title: "Molecules/ACAutocomplete",
  component: ACAutocomplete,
} as ComponentMeta<typeof ACAutocomplete>;

const Template: ComponentStory<typeof ACAutocomplete> = (args) => {
  const [value, setValue] = useState<any>("");

  return (
    <ACAutocomplete
      {...args}
      value={args.value || value}
      onChange={(e, v) => setValue(v)}
      dataTestId="test-id"
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search movies..." />
      )}
    />
  );
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  options: DUMMY_DATA,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  options: DUMMY_DATA,
  multiple: true,
};

export const CustomOptionLabel = Template.bind({});
CustomOptionLabel.args = {
  options: DUMMY_DATA,
  getOptionLabel: (option: any) => option?.year,
};

export const ScrollToBottom = Template.bind({});
ScrollToBottom.args = {
  options: DUMMY_DATA.slice(0, 20),
  onScrollToBottom: () => {
    alert("Scroll to bottom");
  },
  onScrollToBottomOffset: 10,
};

export const FreeSolo = Template.bind({});
FreeSolo.args = {
  options: DUMMY_DATA,
  freeSolo: true,
  multiple: true,
};

export const DisableCloseOnSelect = Template.bind({});
DisableCloseOnSelect.args = {
  options: DUMMY_DATA,
  multiple: true,
  disableCloseOnSelect: true,
  renderInput: (params: any) => (
    <ACInput {...params} placeholder="Search movies..." />
  ),
};

export const DisableSomeOptions = Template.bind({});
DisableSomeOptions.args = {
  options: DUMMY_DATA,
  multiple: true,
  disableCloseOnSelect: true,
  getOptionDisabled: (option: any) => option.year < 2000,
};

export const DisabledAndSelectedOptions = Template.bind({});
const arrayOfObjects = DUMMY_DATA.filter((item) => item.year > 2010);

DisabledAndSelectedOptions.args = {
  options: DUMMY_DATA,
  value: arrayOfObjects,
  multiple: true,
  getOptionDisabled: (option: any) => option.year > 2010,
};
