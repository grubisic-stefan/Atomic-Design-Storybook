import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import ACInput from "../../atoms/ACInput";
import ACAutocomplete from "./ACAutocompleteV2";

const DUMMY_DATA = [
  {
    label: "The Shawshank Redemption",
    year: 1994,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "The Godfather",
    year: 1972,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "The Godfather: Part II",
    year: 1974,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "The Dark Knight",
    year: 2008,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "12 Angry Men",
    year: 1957,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "Pulp Fiction",
    year: 1994,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "Schindler's List",
    year: 1993,
    customRender: "https://picsum.photos/200",
  },
  {
    label: "Fight Club",
    year: 1999,
    customRender: "https://picsum.photos/200",
  },
];
const DUMMY_DATA_STRING = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
];
export default {
  title: "Molecules/ACAutocompleteV2",
  component: ACAutocomplete,
} as ComponentMeta<typeof ACAutocomplete>;

const Template: ComponentStory<typeof ACAutocomplete> = (args) => {
  const [value, setValue] = useState<any>({
    label: "The Shawshank Redemption",
    year: 1994,
    customRender: "https://picsum.photos/200",
  });
  const [DUMMY_DATA_OPTIONS] = useState<any>(DUMMY_DATA);

  return (
    <ACAutocomplete
      {...args}
      onChange={(e, v) => setValue(v)}
      value={value}
      options={DUMMY_DATA_OPTIONS}
      dataTestId="test-id"
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search movies..." />
      )}
    />
  );
};
const Template1: ComponentStory<typeof ACAutocomplete> = (args) => {
  const [value, setValue] = useState<any>([
    {
      label: "The Shawshank Redemption",
      year: 1994,
      customRender: "https://picsum.photos/200",
    },
  ]);
  const [DUMMY_DATA_OPTIONS] = useState<any>(DUMMY_DATA);

  return (
    <ACAutocomplete
      {...args}
      onChange={(e, v) => setValue(v)}
      value={value}
      options={DUMMY_DATA_OPTIONS}
      dataTestId="test-id"
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search movies..." />
      )}
    />
  );
};
const Template2: ComponentStory<typeof ACAutocomplete> = (args) => {
  const [value, setValue] = useState<any>("The Shawshank Redemption");
  const [DUMMY_DATA_OPTIONS] = useState<any>(DUMMY_DATA_STRING);

  return (
    <ACAutocomplete
      {...args}
      onChange={(e, v) => setValue(v)}
      value={value}
      options={DUMMY_DATA_OPTIONS}
      dataTestId="test-id"
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search movies..." />
      )}
    />
  );
};
const Template3: ComponentStory<typeof ACAutocomplete> = (args) => {
  const [value, setValue] = useState<any>(["The Shawshank Redemption"]);
  const [DUMMY_DATA_OPTIONS] = useState<any>(DUMMY_DATA_STRING);

  return (
    <ACAutocomplete
      {...args}
      onChange={(e, v) => setValue(v)}
      value={value}
      options={DUMMY_DATA_OPTIONS}
      dataTestId="test-id"
      renderInput={(params: any) => (
        <ACInput {...params} placeholder="Search movies..." />
      )}
    />
  );
};

export const SingleSelectObjectsOptionsCustomRender = Template.bind({});
SingleSelectObjectsOptionsCustomRender.args = {
  multiple: false,
  freeSolo: false,
  clearAllBtn: true,
  getCustomRender: (option: any) => (
    <div style={{ backgroundColor: "aqua" }}>{option.label} </div>
  ),
};
export const SingleSelectObjectsOptionsFreeSolo = Template.bind({});
SingleSelectObjectsOptionsFreeSolo.args = {
  multiple: false,
  freeSolo: true,
};
export const MultiSelectObjectsOptions = Template1.bind({});
MultiSelectObjectsOptions.args = {
  multiple: true,
  freeSolo: false,
};
export const MultiSelectObjectsOptionsFreeSolo = Template1.bind({});
MultiSelectObjectsOptionsFreeSolo.args = {
  multiple: true,
  freeSolo: false,
};
export const SingleSelectStringOptions = Template2.bind({});
SingleSelectStringOptions.args = {
  multiple: false,
  freeSolo: false,
};
export const MultiSelectStringOptions = Template3.bind({});
MultiSelectStringOptions.args = {
  multiple: true,
  freeSolo: false,
};
