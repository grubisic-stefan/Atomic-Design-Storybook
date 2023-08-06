import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACFilter, { ACFilterItem } from "./ACFilter";

export default {
  title: "Molecules/ACFilter",
  component: ACFilter,
} as ComponentMeta<typeof ACFilter>;

const Template: ComponentStory<typeof ACFilter> = (args) => {
  const [filterState, setFilterState] = useState<ACFilterItem[]>([
    { field: "name", title: "Name", filterType: "text" },
    { field: "number", title: "Number", filterType: "number" },
    { field: "date", title: "Date", filterType: "date" },
    {
      field: "select",
      title: "Select",
      filterType: "selectSingle",
      filterSelectData: [],
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filterTemp: ACFilterItem[] = [...filterState];
      for (const filterItem of filterTemp) {
        if (filterItem.field === "select") {
          filterItem.filterSelectData = [
            { value: "1", render: "yes" },
            { value: "0", render: "no" },
          ];
          break;
        }
      }
      setFilterState(filterTemp);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ACFilter
      {...args}
      filter={filterState}
      onFilterChanged={(filter) => {
        console.log(filter);
      }}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
