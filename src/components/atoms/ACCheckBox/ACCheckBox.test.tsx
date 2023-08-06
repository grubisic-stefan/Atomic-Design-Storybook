import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import ACCheckBox from "./ACCheckBox";
import "@testing-library/jest-dom";

describe("ACCheckBox", () => {
  it("should render", () => {
    render(<ACCheckBox />);
    const checkBox = screen.getByRole("checkBox");
    const checkBoxPure = screen.getByRole("checkBoxPure");

    expect(checkBox).toBeTruthy();
    expect(checkBoxPure).toBeTruthy();
  });
  it("should be checked", () => {
    render(<ACCheckBox checked={true} />);
    const checkBox = screen.getByRole("checkBox");
    const checkBoxPure = screen.getByRole("checkBoxPure");

    expect(checkBox).toHaveStyle("background-color: rgb(37, 86, 107)");
    expect(checkBoxPure).toBeChecked();
  });
  it("shuld call onChange", () => {
    const onChange = jest.fn();
    render(<ACCheckBox onChange={onChange} />);
    const checkBox = screen.getByRole("checkBox");
    const checkBoxPure = screen.getByRole("checkBoxPure");

    fireEvent.click(checkBoxPure);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
