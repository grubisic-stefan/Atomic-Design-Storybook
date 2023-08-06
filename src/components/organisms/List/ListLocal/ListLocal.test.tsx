import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ListLocal from "./ListLocal";
import { ListItem } from "../ListBase/ListBase";

import { MdAdd, MdDelete, MdEdit, MdInfo } from "react-icons/md";

const testDataItems: ListItem[] = [];
for (let i = 1; i <= 7; i++) {
  testDataItems.push({
    id: i.toString(),
    title: "Title " + i,
    description: "Description " + i,
  });
}

describe("ListLocal", () => {
  it("renders the default ListLocal component with no items", () => {
    render(<ListLocal headerTitle={"local list header"} allItems={[]} />);
    expect(screen.getByTestId("List")).toBeInTheDocument();
  });

  it("renders ListLocal component with items", () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    expect(screen.getByTestId("List")).toBeInTheDocument();
    expect(screen.getAllByTestId("List-Items-Item").length === 5);
  });

  it("tests if sort type change works", () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "Sort by" })
        .selected
    ).toBe(true);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole("option", { name: "Sort by name asc" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "Sort by name asc",
      }).selected
    ).toBe(true);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole("option", { name: "Sort by name desc" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "Sort by name desc",
      }).selected
    ).toBe(true);
  });

  it("tests if sorting items works", () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getByRole("option", { name: "Sort by name asc" })
    );

    const itemsParentSelect = screen.getByTestId("List-Items");

    let isSorted = true;
    for (let i = 0; i < itemsParentSelect.children.length; i++) {
      if (
        !itemsParentSelect.children[i].textContent?.includes((i + 1).toString())
      ) {
        isSorted = false;
      }
    }
    expect(isSorted).toBeTruthy();
  });

  it("tests if rows change is working", () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "5 Rows" }).selected
    ).toBe(true);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[1],
      screen.getByRole("option", { name: "10 Rows" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "10 Rows",
      }).selected
    ).toBe(true);
  });

  it("tests if searching items works", async () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    await userEvent.type(screen.getByLabelText("Search"), "Title 1");

    await waitFor(() =>
      expect(screen.getByTestId("List-Items").children.length).toBe(1)
    );

    await userEvent.clear(screen.getByLabelText("Search"));
    await userEvent.type(screen.getByLabelText("Search"), "itl");

    await waitFor(() =>
      expect(screen.getByTestId("List-Items").children.length).toBe(5)
    );
  });

  it("tests if changing page works", () => {
    render(<ListLocal headerTitle={"header title"} allItems={testDataItems} />);

    userEvent.click(screen.getByTestId("controlNext"));
    waitFor(() => {
      expect(screen.getByTestId("List-Items").children.length).toBe(1);
    });
  });

  it("tests if header actions are rendered", () => {
    render(
      <ListLocal
        headerTitle={"header title"}
        allItems={testDataItems}
        headerActions={[
          {
            icon: <MdAdd />,
            onClick: () => {
              console.log("ADD");
            },
          },
          {
            icon: <MdInfo />,
            onClick: () => {
              console.log("INFO");
            },
          },
        ]}
      />
    );

    expect(screen.getByTestId("ACList-HeaderActions")).toBeInTheDocument();
  });

  it("tests if actions are rendered", () => {
    render(
      <ListLocal
        headerTitle={"header title"}
        allItems={testDataItems}
        actions={[
          {
            icon: <MdDelete />,
            onClick: () => {
              console.log("DELETE");
            },
          },
          {
            icon: <MdEdit />,
            onClick: () => {
              console.log("EDIT");
            },
          },
        ]}
      />
    );

    expect(screen.getAllByTestId("List-Items-Item-Icons").length).toEqual(5);
  });

  it("tests if custom item actions are called", async () => {
    const handleDelete = jest.fn();

    render(
      <ListLocal
        headerTitle={"header title"}
        allItems={testDataItems}
        actions={[
          {
            icon: <MdDelete />,
            onClick: handleDelete,
          },
        ]}
      />
    );

    userEvent.click(
      screen.getAllByTestId("List-Items-Item-Icons")[0].children[0].children[0]
    );

    await waitFor(() => {
      expect(handleDelete).toHaveBeenCalled();
    });
  });

  it("if row have titleRender titleRender should be displayed", () => {
    const testDataItemsRender = [
      {
        id: "1",
        title: "Title 1",
        titleRender: <div>Custom title</div>,
      },
      {
        id: "2",
        title: "Title 2",
      },
    ];
    render(
      <ListLocal headerTitle={"header title"} allItems={testDataItemsRender} />
    );

    expect(screen.getByText("Custom title")).toBeInTheDocument();
  });
  it("if row have descriptionRender descriptionRender should be displayed", () => {
    const testDataItemsRender = [
      {
        id: "1",
        title: "Title 1",
        description: "Description 1",
        descriptionRender: <div>Custom description</div>,
      },
      {
        id: "2",
        title: "Title 2",
        description: "Description 2",
      },
    ];
    render(
      <ListLocal headerTitle={"header title"} allItems={testDataItemsRender} />
    );
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});
