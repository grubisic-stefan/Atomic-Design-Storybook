import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACTabs from "./ACTabs";

const tabs = [
  {
    id: 0,
    label: "Users",
    content: "Tab 1 content",
  },
  {
    id: 1,
    label: "Clients",
    content: "Tab 2 content",
  },
];

describe("ACTabs", () => {
  it("renders the default ACTabs component", () => {
    render(<ACTabs tabs={tabs} />);

    expect(screen.getByRole("ACTabs"));
  });

  it("checks if header labels are rendered", () => {
    render(<ACTabs tabs={tabs} />);

    expect(screen.getByText("Users"));
    expect(screen.getByText("Clients"));
  });

  it("checks if initial render first tab content render content is rendered", () => {
    render(<ACTabs tabs={tabs} />);
    expect(screen.getByText("Tab 1 content"));
  });

  it("checks if clicking on second tab renders second tab content", () => {
    render(<ACTabs tabs={tabs} tabParams="value" />);
    userEvent.click(screen.getByText("Clients"));
    expect(screen.getByText("Tab 2 content"));
  });
  it("if pass defaultTab prop 1, checks if renders second tab content", () => {
    render(<ACTabs tabs={tabs} defaultTab={1} />);
    expect(screen.getByText("Tab 2 content"));
  });
});
