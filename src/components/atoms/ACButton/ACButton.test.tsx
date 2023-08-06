import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACButton from "./ACButton";
import { FaAddressBook } from "react-icons/fa";

describe("Button", () => {
  it("renders the default Button component", () => {
    render(<ACButton> Primary </ACButton>);

    expect(screen.getByRole("button")).toHaveClass(
      "AC-Button-contained-primary"
    );
  });

  it("renders the custom Button component", () => {
    render(
      <ACButton variant="outlined" color="success">
        Second
      </ACButton>
    );

    expect(screen.getByRole("button")).toHaveClass(
      "AC-Button-outlined-success"
    );
  });

  it("renders the disabled Button component", () => {
    render(<ACButton disabled={true}> Disabled </ACButton>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders the link Button component", () => {
    render(<ACButton href="https://www.google.com"> Link </ACButton>);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders left icon", () => {
    render(<ACButton leftIcon={<FaAddressBook />}> Left icon </ACButton>);

    expect(screen.getByTestId("leftIcon")).toHaveClass("AC-Button-leftIcon");
  });

  it("renders right icon", () => {
    render(<ACButton rightIcon={<FaAddressBook />}> Right icon </ACButton>);

    expect(screen.getByTestId("rightIcon")).toHaveClass("AC-Button-rightIcon");
  });

  it("renders full width button", () => {
    render(<ACButton fullWidth> Full width button </ACButton>);

    expect(screen.getByTestId("button-wrapper")).toHaveStyle("display: block");
  });
});
