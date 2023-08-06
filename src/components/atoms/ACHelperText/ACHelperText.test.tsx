import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ACHelperText from "./ACHelperText";

describe("ACHelperText", () => {
  const renderComponent = (props: any) => {
    return render(<ACHelperText {...props} />);
  };

  test("renders children", () => {
    const children = "Some helper text";
    renderComponent({ children });

    const helperText = screen.getByText(children);
    expect(helperText).toBeInTheDocument();
  });
  test("renders with alert class", () => {
    const alertMessage = "Please pay attention";
    renderComponent({
      dataTestId: "helper-text",
      hasAlert: true,
      children: alertMessage,
    });

    const helperText = screen.getByTestId("helper-text");
    expect(helperText).toHaveClass("has-alert");
  });
  test("renders with error class", () => {
    const errorMessage = "Something went wrong";
    renderComponent({
      dataTestId: "helper-text",
      hasError: true,
      children: errorMessage,
    });

    const helperText = screen.getByTestId("helper-text");
    expect(helperText).toHaveClass("has-error");
  });

  test("renders with style attribute", () => {
    const style = { color: "red" };
    render(
      <ACHelperText dataTestId="helper-text" style={style}>
        Some text
      </ACHelperText>
    );
    const helperText = screen.getByTestId("helper-text");
    expect(helperText).toHaveStyle(style);
  });

  test("renders with custom style", () => {
    renderComponent({
      dataTestId: "helper-text",
      children: "Some text",
      style: { backgroundColor: "blue" },
    });

    const helperText = screen.getByTestId("helper-text");
    expect(helperText).toHaveStyle({ backgroundColor: "blue" });
  });

  test("renders with data-testid attribute", () => {
    const testId = "my-helper-text";
    renderComponent({
      dataTestId: testId,
      children: "Some text",
    });
    const helperText = screen.getByTestId(testId);
    expect(helperText).toBeInTheDocument();
  });
});
