import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Button from "./Button";
import { FaAddressBook } from "react-icons/fa";

describe("Button", () => {
  it("renders the default Button component", () => {
    render(<Button> Primary </Button>);

    expect(screen.getByRole("button")).toHaveClass("Button-contained-primary");
  });

  it("renders the custom Button component", () => {
    render(
      <Button variant="outlined" color="success">
        Second
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("Button-outlined-success");
  });

  it("renders the disabled Button component", () => {
    render(<Button disabled={true}> Disabled </Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders the link Button component", () => {
    render(<Button href="https://www.google.com"> Link </Button>);

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders left icon", () => {
    render(<Button leftIcon={<FaAddressBook />}> Left icon </Button>);

    expect(screen.getByTestId("leftIcon")).toHaveClass("Button-leftIcon");
  });

  it("renders right icon", () => {
    render(<Button rightIcon={<FaAddressBook />}> Right icon </Button>);

    expect(screen.getByTestId("rightIcon")).toHaveClass("Button-rightIcon");
  });

  it("renders full width button", () => {
    render(<Button fullWidth> Full width button </Button>);

    expect(screen.getByTestId("button-wrapper")).toHaveStyle("display: block");
  });
});
