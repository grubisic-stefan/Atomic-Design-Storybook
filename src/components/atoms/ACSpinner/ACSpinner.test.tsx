import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACSpinner from "./ACSpinner";

describe("ACSpinner", () => {
  it("renders the default ACSpinner component", () => {
    render(<ACSpinner />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders the ACSpinner component with sm class", () => {
    render(<ACSpinner size="sm" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("sm");
  });

  it("renders the ACSpinner component with md class", () => {
    render(<ACSpinner size="md" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("md");
  });

  it("renders the ACSpinner component with lg class", () => {
    render(<ACSpinner size="lg" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("lg");
  });

  it("renders the ACSpinner component with xs class", () => {
    render(<ACSpinner size="xs" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("xs");
  });

  it("renders the ACSpinner component with the background color", () => {
    const color = "#25abca";
    render(<ACSpinner background={color} />);
    const spinner = screen.getByTestId("border");
    expect(spinner).toHaveStyle(
      `border-color: ${color} transparent transparent transparent`
    );
  });
});
