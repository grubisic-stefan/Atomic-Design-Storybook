import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACFilter, { ACFilterItem } from "./ACFilter";

const filterMock: ACFilterItem[] = [
  { field: "name", title: "Name", filterType: "text" },
  {
    field: "client",
    title: "Client",
    filterType: "selectSingle",
    filterSelectData: [
      { value: "client-id-1", render: "John" },
      { value: "client-id-2", render: "Mark" },
    ],
  },
];

describe("ACFilter", () => {
  it("renders the default ACFilter component", () => {
    render(
      <ACFilter filter={filterMock} onFilterChanged={(filterState) => {}} />
    );

    expect(screen.getByTestId("ACFilter")).toBeInTheDocument();
  });

  it("tests if select in filter works", () => {
    render(
      <ACFilter filter={filterMock} onFilterChanged={(filterState) => {}} />
    );

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole<HTMLOptionElement>("option", {
        name: "John",
      })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "John",
      }).selected
    ).toBe(true);
  });
});
