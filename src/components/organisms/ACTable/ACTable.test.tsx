import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ACTable, IACTableColumn, IACTableRow } from "./ACTable";
import { ACFilterItem } from "../../molecules/ACFilter/ACFilter";

const columns: IACTableColumn[] = [
  { field: "name", title: "Name" },
  { field: "age", title: "Age" },
  {
    field: "team",
    title: "Team",
  },
];

const filter: ACFilterItem[] = [
  {
    field: "team",
    title: "Team",
    filterType: "selectSingle",
    filterSelectData: [
      { value: "Los Angeles Lakers", render: "Los Angeles Lakers" },
      { value: "Brooklyn Nets", render: "Brooklyn Nets" },
    ],
  },
  {
    field: "name",
    title: "Name",
    filterType: "text",
  },
];

const rowsRaw = [
  { uuid: "1", name: "LeBron", age: 38, team: "Los Angeles Lakers" },
  { uuid: "2", name: "Kevin", age: 34, team: "Brooklyn Nets" },
];

const rows: IACTableRow[] = rowsRaw.map((row) => ({
  rawData: row,
  render: row,
}));

describe("ACTable", () => {
  it("renders the default ACTable component", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
      />
    );

    expect(screen.getByRole("table"));
  });

  it("checks if selection is working", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        selection
        onSelectionChange={(selectedRows) => {}}
      />
    );

    const checkboxForAllRows =
      screen.getAllByRole<HTMLInputElement>("checkbox")[0];
    const checkboxForIndividual =
      screen.getAllByRole<HTMLInputElement>("checkbox")[1];
    const rowToSelect = screen.getByRole<HTMLTableElement>("table").rows[1];

    // CHECKBOX THAT SELECTS ALL ROWS
    userEvent.click(checkboxForAllRows);
    expect(checkboxForAllRows.checked).toBeTruthy();
    expect(rowToSelect.className.includes("selected")).toBeTruthy();
    userEvent.click(checkboxForAllRows);
    expect(checkboxForAllRows.checked).toBeFalsy();

    // CHECKBOX THAT SELECTS ONE INDIVIDUAL ROW
    userEvent.click(checkboxForIndividual);
    expect(checkboxForIndividual.checked).toBeTruthy();
    expect(rowToSelect.className.includes("selected")).toBeTruthy();
    userEvent.click(checkboxForIndividual);
    expect(checkboxForIndividual.checked).toBeFalsy();
  });

  it("checks if sorting is working", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
      />
    );

    const headerToSelect =
      screen.getByRole<HTMLTableElement>("table").tHead?.rows[0].children[0];

    userEvent.click(headerToSelect!);
  });

  it("checks if actions are rendered", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        pagesCount={1}
        allItemsCount={2}
        onTableStateChange={(tableState) => {}}
        actions={[
          {
            icon: <h1> DELETE ICON </h1>,
            onClick: (rowData) => {},
          },
        ]}
      />
    );

    const dataRow = screen.getByRole<HTMLTableElement>("table").rows[1];
    const action =
      dataRow.children[dataRow.childElementCount - 1].children[0].children[0];
    userEvent.click(action);
  });

  it("checks if conditional actions, hidden works", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        pagesCount={1}
        allItemsCount={2}
        onTableStateChange={(tableState) => {}}
        actions={[
          {
            rowData(rowData) {
              return {
                icon: <div>Icon</div>,
                onClick: (data) => {},
                hide(rowData) {
                  return rowData.rawData.name !== "Lebron";
                },
              };
            },
          },
        ]}
      />
    );
    const dataRow = screen.getByRole<HTMLTableElement>("table").rows[1];
    const action =
      dataRow.children[dataRow.childElementCount - 1].children[0].children[0];
    expect(action).toBeEmptyDOMElement();
  });

  it("checks if conditional actions, disabled works", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        pagesCount={1}
        allItemsCount={2}
        onTableStateChange={(tableState) => {}}
        actions={[
          {
            rowData(rowData) {
              return {
                icon: <div>Icon</div>,
                onClick: (data) => {},
                disabled(rowData) {
                  return rowData.rawData.name !== "Lebron";
                },
              };
            },
          },
        ]}
      />
    );
    const dataRow = screen.getByRole<HTMLTableElement>("table").rows[1];
    const action =
      dataRow.children[dataRow.childElementCount - 1].children[0].children[0]
        .children[0].children[0];
    expect(action).toBeDisabled();
  });

  it("checks if changing rows number is working", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
      />
    );

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "5 Rows" }).selected
    ).toBe(true);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole("option", { name: "10 Rows" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "10 Rows",
      }).selected
    ).toBe(true);
  });

  it("checks if actions for multiple selections are rendered", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        selection
        multipleSelectionsActions={[
          {
            icon: (
              <h1 data-testid="multipleSelectionDeleteIcon"> DELETE ICON </h1>
            ),
            onClick: (rowData) => {},
          },
        ]}
      />
    );

    const checkboxForAllRows =
      screen.getAllByRole<HTMLInputElement>("checkbox")[0];

    userEvent.click(checkboxForAllRows);

    const multipleSelectionDeleteIcon = screen.getByTestId(
      "multipleSelectionDeleteIcon"
    );

    expect(multipleSelectionDeleteIcon).toBeInTheDocument();
    userEvent.click(multipleSelectionDeleteIcon);
  });

  it("checks the reset filter button", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        filter={filter}
      />
    );

    userEvent.click(screen.getByTestId("showFilterButton"));
    userEvent.type(screen.getByLabelText("Name"), "Something");
    expect(screen.getByLabelText<HTMLInputElement>("Name").value).toEqual(
      "Something"
    );
    userEvent.click(screen.getByText("Reset"));
    expect(screen.getByLabelText<HTMLInputElement>("Name").value).toEqual("");
  });

  it("checks if selecting an item works", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        onItemClicked={(row) =>
          expect(row).toEqual({
            uuid: "1",
            name: "LeBron",
            age: 38,
            team: "Los Angeles Lakers",
          })
        }
      />
    );

    userEvent.click(
      screen.getByRole<HTMLTableElement>("table").rows[1].cells[0]
    );
  });

  it("checks if selecting next page works", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={2}
        onTableStateChange={(tableState) => {}}
      />
    );

    userEvent.click(screen.getByTestId("controlNext"));
  });

  it("checks if filter selection works", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        filter={filter}
      />
    );

    userEvent.click(screen.getByTestId("showFilterButton"));

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole<HTMLOptionElement>("option", {
        name: "Los Angeles Lakers",
      })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "Los Angeles Lakers",
      }).selected
    ).toBe(true);
  });

  it("checks if showFilter button calls the onShowFilter callback", () => {
    const onShowFilter = jest.fn();

    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        filter={filter}
        onShowFilter={onShowFilter}
      />
    );

    userEvent.click(screen.getByTestId("showFilterButton"));

    expect(onShowFilter).toHaveBeenCalled();
  });

  it("checks if header actions are rendered", () => {
    render(
      <ACTable
        columns={columns}
        rows={rows}
        headerTitle={"Table header title"}
        allItemsCount={2}
        pagesCount={1}
        onTableStateChange={(tableState) => {}}
        headerActions={[{ icon: <h1> icon </h1>, onClick() {} }]}
      />
    );

    expect(screen.getByTestId("headerActionsWrapper")).toBeInTheDocument();
  });
});
