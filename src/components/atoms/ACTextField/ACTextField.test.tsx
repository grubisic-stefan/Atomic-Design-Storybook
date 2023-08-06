import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACTextField from "./ACTextField";

describe("ACTextField", () => {
  it("renders the default ACTextField component", () => {
    render(<ACTextField />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeInTheDocument();
  });

  it("renders the disabled ACTextField component", () => {
    render(<ACTextField label="Disabled" disabled={true} />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeDisabled();
  });

  it("renders the required ACTextField component", () => {
    render(<ACTextField required />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeRequired();
  });

  it("renders the ACTextField component with HelperText span", () => {
    render(<ACTextField helperText="This is a helper text" />);
    const helperText = screen.getByText("This is a helper text");

    expect(helperText).toBeInTheDocument();
  });

  it("renders the ACTextField component with Error prop", () => {
    render(<ACTextField error />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField--error");
  });

  it("renders the ACTextField component with default values", () => {
    render(<ACTextField defaultValue={"lorem ipsum"} />);
    const textfield = screen.getByRole("textbox");

    expect(textfield).toHaveValue("lorem ipsum");
  });

  it("renders the ACTextField component with label", () => {
    render(<ACTextField label={"label"} id={"random-test-id"} />);
    const label = screen.getByLabelText("label");

    expect(label).toBeInTheDocument();
  });

  it("renders the ACTextField component with placeholder text", () => {
    render(<ACTextField placeholder="Username" />);
    const inputElement = screen.queryByPlaceholderText(/Username/i);

    expect(inputElement?.getAttribute("placeholder")).toBe("Username");
  });

  it("renders the ACTextField component with outlined variant", () => {
    render(<ACTextField variant="outlined" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-outlined");
  });

  it("renders the ACTextField component with filled variant", () => {
    render(<ACTextField variant="filled" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-filled");
  });

  it("renders the ACTextField component with standard variant", () => {
    render(<ACTextField variant="standard" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-standard");
  });

  it("renders the ACTextField component with fullWidth prop", () => {
    render(<ACTextField fullWidth />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField--fullWidth");
  });

  it("renders the ACTextField component as type password", () => {
    render(<ACTextField type="password" placeholder="password" />);
    const inputElement = screen.getByPlaceholderText(/password/i);

    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("renders the ACTextField component with secondary color", () => {
    render(<ACTextField color="secondary" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-color-secondary");
  });

  it("renders the ACTextField component with success color", () => {
    render(<ACTextField color="success" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-color-success");
  });

  it("renders the ACTextField component with error color", () => {
    render(<ACTextField color="error" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("AC-TextField-color-error");
  });

  it("check if onClick adds focus class", () => {
    render(<ACTextField placeholder="username" />);
    const inputElement = screen.getByPlaceholderText(/username/i);
    const textfield = screen.getByTestId("textfield-root");

    userEvent.click(inputElement);
    expect(textfield).toHaveClass("focused");
  });

  it("check if input is focused automatically when autoFocus prop is passed", () => {
    render(<ACTextField autoFocus placeholder="username" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("focused");
  });

  it("test if onBlur removes focused className from TextField", () => {
    render(<ACTextField placeholder="first" autoFocus />);
    render(
      <div>
        <label htmlFor="checkbox">Check</label>
        <input id="checkbox" type="checkbox" />
      </div>
    );

    const textfield = screen.getByTestId("textfield-root");

    userEvent.click(screen.getByText("Check"));

    expect(textfield).not.toHaveClass("focused");
    expect(screen.getByLabelText("Check")).toBeChecked();
  });

  it("should call onChange prop", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(
      <ACTextField
        onChange={(e) => console.log(e.currentTarget.value)}
        placeholder="username"
      />
    );
    const inputElement = screen.getByPlaceholderText(/username/i);

    fireEvent.change(inputElement, {
      target: { value: "random text for testing purposes" },
    });
    expect(consoleSpy).toHaveBeenCalledWith("random text for testing purposes");
  });

  it("test if onClick prop works", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(
      <ACTextField
        placeholder="username"
        onClick={() => console.log("click")}
      />
    );
    const inputElement = screen.getByPlaceholderText(/username/i);

    fireEvent(
      inputElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(consoleSpy).toHaveBeenCalledWith("click");
  });

  it("test if onBlur prop removes focused from TextField", () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(
      <ACTextField
        placeholder="first"
        onBlur={() => console.log("blur")}
        autoFocus
      />
    );
    render(
      <div>
        <label htmlFor="checkbox">Check</label>
        <input id="checkbox" type="checkbox" />
      </div>
    );

    const textfield = screen.getByTestId("textfield-root");

    userEvent.click(screen.getByText("Check"));

    expect(textfield).not.toHaveClass("focused");
    expect(screen.getByLabelText("Check")).toBeChecked();
    expect(consoleSpy).toHaveBeenCalledWith("blur");
  });
});
