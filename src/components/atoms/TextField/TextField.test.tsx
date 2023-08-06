import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TextField from "./TextField";

describe("TextField", () => {
  it("renders the default TextField component", () => {
    render(<TextField />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeInTheDocument();
  });

  it("renders the disabled TextField component", () => {
    render(<TextField label="Disabled" disabled={true} />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeDisabled();
  });

  it("renders the required TextField component", () => {
    render(<TextField required />);
    const textbox = screen.getByRole("textbox");

    expect(textbox).toBeRequired();
  });

  it("renders the TextField component with HelperText span", () => {
    render(<TextField helperText="This is a helper text" />);
    const helperText = screen.getByText("This is a helper text");

    expect(helperText).toBeInTheDocument();
  });

  it("renders the TextField component with Error prop", () => {
    render(<TextField error />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField--error");
  });

  it("renders the TextField component with default values", () => {
    render(<TextField defaultValue={"lorem ipsum"} />);
    const textfield = screen.getByRole("textbox");

    expect(textfield).toHaveValue("lorem ipsum");
  });

  it("renders the TextField component with label", () => {
    render(<TextField label={"label"} id={"random-test-id"} />);
    const label = screen.getByLabelText("label");

    expect(label).toBeInTheDocument();
  });

  it("renders the TextField component with placeholder text", () => {
    render(<TextField placeholder="Username" />);
    const inputElement = screen.queryByPlaceholderText(/Username/i);

    expect(inputElement?.getAttribute("placeholder")).toBe("Username");
  });

  it("renders the TextField component with outlined variant", () => {
    render(<TextField variant="outlined" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-outlined");
  });

  it("renders the TextField component with filled variant", () => {
    render(<TextField variant="filled" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-filled");
  });

  it("renders the TextField component with standard variant", () => {
    render(<TextField variant="standard" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-standard");
  });

  it("renders the TextField component with fullWidth prop", () => {
    render(<TextField fullWidth />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField--fullWidth");
  });

  it("renders the TextField component as type password", () => {
    render(<TextField type="password" placeholder="password" />);
    const inputElement = screen.getByPlaceholderText(/password/i);

    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("renders the TextField component with secondary color", () => {
    render(<TextField color="secondary" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-color-secondary");
  });

  it("renders the TextField component with success color", () => {
    render(<TextField color="success" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-color-success");
  });

  it("renders the TextField component with error color", () => {
    render(<TextField color="error" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("TextField-color-error");
  });

  it("check if onClick adds focus class", () => {
    render(<TextField placeholder="username" />);
    const inputElement = screen.getByPlaceholderText(/username/i);
    const textfield = screen.getByTestId("textfield-root");

    userEvent.click(inputElement);
    expect(textfield).toHaveClass("focused");
  });

  it("check if input is focused automatically when autoFocus prop is passed", () => {
    render(<TextField autoFocus placeholder="username" />);
    const textfield = screen.getByTestId("textfield-root");

    expect(textfield).toHaveClass("focused");
  });

  it("test if onBlur removes focused className from TextField", () => {
    render(<TextField placeholder="first" autoFocus />);
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
      <TextField
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
      <TextField placeholder="username" onClick={() => console.log("click")} />
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
      <TextField
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
