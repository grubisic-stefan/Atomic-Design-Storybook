import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Pagination from "./Pagination";

export default {
  title: "Molecules/Pagination",
  component: Pagination,
  argTypes: { handleChange: { action: "handleChange" } },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [pagesCount, setPagesCount] = useState(20);
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <Pagination
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
