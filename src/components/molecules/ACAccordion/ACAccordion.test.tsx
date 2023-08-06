import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACAccordion, { IACAccordionItem } from "./ACAccordion";

const testItems: IACAccordionItem[] = [
  {
    title: "Accordion title 1",
    data: (
      <div>
        <p>This is some custom accordion description 1</p>
      </div>
    ),
  },
  {
    title: "Accordion title 2",
    data: (
      <div>
        <p>This is some custom accordion description 2</p>
      </div>
    ),
  },
  {
    title: "Accordion title 3",
    data: (
      <div>
        <p>This is some custom accordion description 3</p>
      </div>
    ),
  },
];

describe("ACAccordion", () => {
  it("renders the default Accordion component", () => {
    render(<ACAccordion items={testItems} />);

    expect(screen.getByTestId("ACAccordion")).toBeVisible();
  });

  it("checks that clicking an item expands and shrinks the accordion", () => {
    render(<ACAccordion items={testItems} />);

    userEvent.click(screen.getByTestId("ACAccordion").children[0].children[0]);

    expect(
      screen
        .getAllByTestId("ACAccordion-item-data-wrapper")[0]
        .className.includes("visible")
    ).toBeTruthy();

    userEvent.click(screen.getByTestId("ACAccordion").children[0].children[0]);

    expect(
      screen
        .getAllByTestId("ACAccordion-item-data-wrapper")[0]
        .className.includes("hidden")
    ).toBeTruthy();
  });
});
