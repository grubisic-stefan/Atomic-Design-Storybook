import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACPagination from "./ACPagination";

export default {
  title: "Molecules/ACPagination",
  component: ACPagination,
  argTypes: { handleChange: { action: "handleChange" } },
} as ComponentMeta<typeof ACPagination>;

const Template: ComponentStory<typeof ACPagination> = (args) => {
  const [pagesCount, setPagesCount] = useState(20);
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <ACPagination
      {...args}
      pagesCount={pagesCount}
      handleChange={(paginationState) => {
        setCurrentPage(paginationState.selectedPage);
      }}
      currentPage={currentPage}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
