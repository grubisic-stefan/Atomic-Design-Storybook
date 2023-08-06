import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACPagination from "./Pagination";
import { ACPaginationUncontrolledTestWrapper } from "./PaginationUncontrolledTestWrapper";

describe("Pagination", () => {
  it("renders the Pagination component", async () => {
    render(<ACPaginationUncontrolledTestWrapper />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveClass("Pagination");
  });

  it("tests if page 2 has been selected", async () => {
    render(<ACPaginationUncontrolledTestWrapper />);

    await userEvent.click(screen.getByText("2"));
    expect(screen.getByText("2")).toHaveClass(
      "PaginationItem-selected-primary-text"
    );
  });

  it("tests if last element is the last page number", () => {
    const { container } = render(
      <ACPaginationUncontrolledTestWrapper pages={10} />
    );

    expect(container.lastChild?.textContent?.includes("10")).toBeTruthy();
  });

  it("tests if first page and three dots item are visible", () => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={1} />);

    expect(screen.getByText("1")).toBeInTheDocument();

    const allListItems = screen.getAllByRole("listitem");
    let containsThreeDotsIcon = false;
    for (const listItem of allListItems) {
      if (listItem.className.includes("Pagination-threeDots")) {
        containsThreeDotsIcon = true;
      }
    }

    expect(containsThreeDotsIcon).toBeTruthy();
  });

  it("tests if last page and three dots item are visible", () => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={10} />);

    expect(screen.getByText("10")).toBeInTheDocument();

    const allListItems = screen.getAllByRole("listitem");
    let containsThreeDotsIcon = false;
    for (const listItem of allListItems) {
      if (listItem.className.includes("Pagination-threeDots")) {
        containsThreeDotsIcon = true;
      }
    }

    expect(containsThreeDotsIcon).toBeTruthy();
  });

  it("tests if middle item and two three dots icons are visible", () => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={5} />);

    expect(screen.getByText("5")).toBeInTheDocument();

    const allListItems = screen.getAllByRole("listitem");
    let containsThreeDotsIcon = false;
    let containsThreeDotsIconAgain = false;
    for (const listItem of allListItems) {
      if (listItem.className.includes("Pagination-threeDots")) {
        containsThreeDotsIcon = true;
        containsThreeDotsIconAgain = true;
      }
    }

    expect(containsThreeDotsIcon && containsThreeDotsIconAgain).toBeTruthy();
  });

  it("tests if handleChange is working", async () => {
    let currentPage = 0;
    render(
      <ACPagination
        pagesCount={10}
        currentPage={1}
        handleChange={({ selectedPage }) => {
          currentPage = selectedPage;
        }}
      />
    );

    await userEvent.click(screen.getByText("2"));

    expect(currentPage === 2).toBeTruthy();
  });

  const wrapperForTestingButtons = (testId: string, buttonText: string) => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={3} />);

    userEvent.click(screen.getByTestId(testId));
    expect(screen.getByText(buttonText)).toHaveClass(
      "PaginationItem-selected-primary-text"
    );
  };

  it("tests if first control button is working", async () => {
    wrapperForTestingButtons("controlFirst", "1");
  });

  it("tests if previous control button is working", async () => {
    wrapperForTestingButtons("controlPrev", "2");
  });

  it("tests if next control button is working", async () => {
    wrapperForTestingButtons("controlNext", "4");
  });

  it("tests if last control button is working", async () => {
    wrapperForTestingButtons("controlLast", "10");
  });

  it("tests if all page numbers have been rendered if minimum page number is not reached because of big siblings number", () => {
    render(
      <ACPaginationUncontrolledTestWrapper pages={5} siblingsOnEachSide={3} />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeVisible();
    }
  });

  it("tests if number of siblings is correct", () => {
    render(
      <ACPaginationUncontrolledTestWrapper
        pages={100}
        page={50}
        siblingsOnEachSide={3}
      />
    );
    expect(screen.getByText("47")).toBeVisible();
    expect(screen.getByText("48")).toBeVisible();
    expect(screen.getByText("49")).toBeVisible();
    expect(screen.getByText("51")).toBeVisible();
    expect(screen.getByText("52")).toBeVisible();
    expect(screen.getByText("53")).toBeVisible();
  });

  it("tests if first and previous control buttons are disabled", () => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={1} />);

    expect(screen.getByTestId("controlFirst")).toHaveClass("disabled");
    expect(screen.getByTestId("controlPrev")).toHaveClass("disabled");
  });

  it("tests if next and last control buttons are disabled", () => {
    render(<ACPaginationUncontrolledTestWrapper pages={10} page={10} />);

    expect(screen.getByTestId("controlNext")).toHaveClass("disabled");
    expect(screen.getByTestId("controlLast")).toHaveClass("disabled");
  });

  it("tests if number of siblings is correct", () => {
    render(
      <ACPaginationUncontrolledTestWrapper
        pages={10}
        page={5}
        showFirstAndLastPages
      />
    );
    expect(screen.getByText("1")).toBeVisible();
    expect(screen.getByText("10")).toBeVisible();
  });
});
