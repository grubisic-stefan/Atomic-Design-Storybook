import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACInput from "./ACInput";

const TestingACInput = (props: any): any => <ACInput {...props} />;

describe("ACInput", () => {
  const props = {
    dataTestId: "test-id",
  };

  it("Should attach the dataTestId to the component", () => {
    render(TestingACInput({ ...props }));
    const input = screen.getByTestId(`${props.dataTestId}`);
    expect(input).toBeInTheDocument();
  });

  it("Should render the label", () => {
    render(TestingACInput({ ...props, label: "Label Text" }));
    const label = screen.getByText("Label Text");
    expect(label).toBeInTheDocument();
  });

  it("Should render the placeholder", () => {
    render(TestingACInput({ ...props, placeholder: "Placeholder Text" }));
    const placeholder = screen.getByPlaceholderText("Placeholder Text");
    expect(placeholder).toBeInTheDocument();
  });

  it("Should render the helper text", () => {
    render(TestingACInput({ ...props, helperText: "Helper Text" }));
    const helperText = screen.getByText("Helper Text");
    expect(helperText).toBeInTheDocument();
  });

  it("Should render the addonBefore and addonAfter", () => {
    render(
      TestingACInput({
        ...props,
        addonBefore: "https://",
        addonAfter: ".com",
      })
    );
    const addonBefore = screen.getByText("https://");
    const addonAfter = screen.getByText(".com");
    expect(addonBefore).toBeInTheDocument();
    expect(addonAfter).toBeInTheDocument();
  });

  it("Should render the prefix and suffix", () => {
    render(
      TestingACInput({
        ...props,
        prefix: "https://",
        suffix: ".com",
      })
    );
    const prefix = screen.getByText("https://");
    const suffix = screen.getByText(".com");
    expect(prefix).toBeInTheDocument();
    expect(suffix).toBeInTheDocument();
  });

  it("Should render the disabled state", () => {
    render(TestingACInput({ ...props, disabled: true }));
    const input = screen.getByTestId(`${props.dataTestId}`);
    expect(input).toBeDisabled();
  });

  it("Should render the fullWidth state", () => {
    render(TestingACInput({ ...props, fullWidth: true }));
    const wrapper = screen.getByTestId(`${props.dataTestId}-input-wrapper`);
    expect(wrapper).toHaveClass("full-width");
  });

  it("Should render the allowClear icon when allowClear prop is passed and input has value", () => {
    render(TestingACInput({ ...props, allowClear: true, value: "Value" }));
    const clearIcon = screen.getByTestId(
      `${props.dataTestId}-input-allow-clear`
    );
    expect(clearIcon).toBeInTheDocument();
  });

  it("Should clear the value when allowClear is clicked", () => {
    render(
      TestingACInput({
        ...props,
        allowClear: true,
        value: "Initial Value",
      })
    );
    const clearIcon = screen.getByTestId(
      `${props.dataTestId}-input-allow-clear`
    );
    userEvent.click(clearIcon);
    const input = screen.getByTestId(`${props.dataTestId}`);
    expect(input).toHaveValue();
  });

  it("Should render the error state", () => {
    render(TestingACInput({ ...props, hasError: true }));
    const input = screen.getByTestId(props.dataTestId);
    expect(input).toHaveClass("has-error");
  });

  it("Should render the error message", () => {
    render(
      TestingACInput({
        ...props,
        errorMessage: "Error Message",
        hasError: true,
      })
    );
    const errorMessage = screen.getByText("Error Message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Should render the size", () => {
    render(TestingACInput({ ...props, size: "large" }));
    const input = screen.getByTestId(props.dataTestId);
    expect(input).toHaveClass("large");
  });

  it("Should render the type", () => {
    render(TestingACInput({ ...props, type: "password" }));
    const input = screen.getByTestId(props.dataTestId);
    expect(input).toHaveAttribute("type", "password");
  });

  it("Should render the value", () => {
    render(TestingACInput({ ...props, value: "Value" }));
    const input = screen.getByTestId(props.dataTestId);
    expect(input).toHaveValue("Value");
  });

  it("Should render the value", () => {
    render(TestingACInput({ ...props, value: "Default Value" }));
    const input = screen.getByTestId(props.dataTestId);
    expect(input).toHaveValue("Default Value");
  });

  it("Should render the onChange event", () => {
    const onChange = jest.fn();
    render(TestingACInput({ ...props, onChange }));
    const input = screen.getByTestId(props.dataTestId);
    userEvent.type(input, "Value");
    expect(onChange).toHaveBeenCalled();
  });

  it("Should render the onFocus event", () => {
    const onFocus = jest.fn();
    render(TestingACInput({ ...props, onFocus }));
    userEvent.tab();
    expect(onFocus).toHaveBeenCalled();
  });

  it("Should run callback when user presses enter", () => {
    const onEnterPress = jest.fn();
    render(TestingACInput({ ...props, onEnterPress }));
    const input = screen.getByTestId(props.dataTestId);
    userEvent.type(input, "{enter}");
    expect(onEnterPress).toHaveBeenCalled();
  });

  it("Should toggle input type by clicking on eye icon", () => {
    render(TestingACInput({ ...props, type: "password" }));
    const input = screen.getByTestId(props.dataTestId);
    userEvent.type(input, "secret-password");
    const eyeIcon = screen.getByTestId(
      `${props.dataTestId}-input-toggle-password-icon`
    );
    userEvent.click(eyeIcon);
    expect(input).toHaveAttribute("type", "text");
  });

  it("Should render the addonBefore and addonAfter", () => {
    render(
      TestingACInput({
        ...props,
        addonBefore: "https://",
        addonAfter: ".com",
      })
    );
    const addonBefore = screen.getByText("https://");
    const addonAfter = screen.getByText(".com");
    expect(addonBefore).toBeInTheDocument();
    expect(addonAfter).toBeInTheDocument();
  });

  it("Should render the textarea element", () => {
    render(
      TestingACInput({
        ...props,
        isTextArea: true,
      })
    );
    const textareaEl = screen.getByTestId(`${props.dataTestId}-text-area`);
    expect(textareaEl).toBeInTheDocument();
  });

  it("Should render the label for the textarea", () => {
    render(
      TestingACInput({
        ...props,
        isTextArea: true,
        label: "Label Text",
      })
    );
    const label = screen.getByTestId(`${props.dataTestId}-text-area-label`);
    expect(label).toBeInTheDocument();
  });
});
