import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACSwitch from "./ACSwitch";

describe("ACSwitch", () => {
  it("renders the default ACSwitch component with checked false", async () => {
    render(<ACSwitch checked={false} onChange={() => {}} />);

    expect(screen.getByTestId("ACSwitch").children[0]).toHaveClass(
      "ACSwitch-off"
    );
  });

  it("renders the default ACSwitch component with checked true", async () => {
    render(<ACSwitch checked={true} onChange={() => {}} />);

    expect(screen.getByTestId("ACSwitch").children[0]).toHaveClass(
      "ACSwitch-on"
    );
  });

  it("checks if handleChange is called when clicked", () => {
    const handleChange = jest.fn();
    render(<ACSwitch checked={false} onChange={handleChange} />);

    userEvent.click(screen.getByTestId("ACSwitch"));

    expect(handleChange).toHaveBeenCalled();
  });

  it("checks if switch is disabled", () => {
    const handleChange = jest.fn();
    render(<ACSwitch checked={true} onChange={handleChange} disabled={true} />);

    expect(screen.getByTestId("ACSwitch").children[0]).toHaveClass(
      "ACSwitch-disabled"
    );

    userEvent.click(screen.getByTestId("ACSwitch"));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("checks if label is rendered", () => {
    render(
      <ACSwitch
        checked={true}
        onChange={() => {}}
        label="Label"
        labelPlacement="start"
      />
    );

    expect(screen.getByTestId("ACSwitch-label")).toBeInTheDocument();
  });
});
