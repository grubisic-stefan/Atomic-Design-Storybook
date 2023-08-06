import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ACTypography from "./ACTypography";

describe("ACTypography", () => {
  test("renders h1 tag", () => {
    render(<ACTypography variant="h1">h1</ACTypography>);
    expect(screen.getByText("h1").tagName).toEqual("H1");
  });

  test("renders h2 tag", () => {
    render(<ACTypography variant="h2">h2</ACTypography>);
    expect(screen.getByText("h2").tagName).toEqual("H2");
  });

  test("renders h3 tag", () => {
    render(<ACTypography variant="h3">h3</ACTypography>);
    expect(screen.getByText("h3").tagName).toEqual("H3");
  });

  test("renders h4 tag", () => {
    render(<ACTypography variant="h4">h4</ACTypography>);
    expect(screen.getByText("h4").tagName).toEqual("H4");
  });

  test("renders h5 tag", () => {
    render(<ACTypography variant="h5">h5</ACTypography>);
    expect(screen.getByText("h5").tagName).toEqual("H5");
  });

  test("renders h6 tag", () => {
    render(<ACTypography variant="h6">h6</ACTypography>);
    expect(screen.getByText("h6").tagName).toEqual("H6");
  });

  test("renders p tag when variant='body1' is provided", () => {
    render(<ACTypography variant="body1">body1</ACTypography>);
    expect(screen.getByText("body1").tagName).toEqual("P");
  });

  test("renders p tag when variant='body2' is provided", () => {
    render(<ACTypography variant="body2">body2</ACTypography>);
    expect(screen.getByText("body2").tagName).toEqual("P");
  });

  test("renders span tag when variant='caption' is provided", () => {
    render(<ACTypography variant="caption">caption</ACTypography>);
    expect(screen.getByText("caption").tagName).toEqual("SPAN");
  });

  test("renders span tag when variant='button' is provided", () => {
    render(<ACTypography variant="button">button</ACTypography>);
    expect(screen.getByText("button").tagName).toEqual("SPAN");
  });

  test("renders h1 with align prop set to inherit", () => {
    render(
      <ACTypography variant="h1" align="inherit">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass(
      "AC-Typography-base AC-Typography-h1"
    );
  });

  test("renders h1 with align prop set to center", () => {
    render(
      <ACTypography variant="h1" align="center">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-align-center");
  });

  test("renders h1 with align prop set to left", () => {
    render(
      <ACTypography variant="h1" align="left">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-align-left");
  });

  test("renders h1 with align prop set to right", () => {
    render(
      <ACTypography variant="h1" align="right">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-align-right");
  });

  test("renders h1 with align prop set to justify", () => {
    render(
      <ACTypography variant="h1" align="justify">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-align-justify");
  });

  test("renders h1 with gutterBottom prop and check if it has AC-Typography-gutterBottom className", () => {
    render(
      <ACTypography variant="h1" gutterBottom>
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-gutterBottom");
  });

  test("renders h1 with gutterBottom prop and checks if it has AC-Typography-gutterBottom className", () => {
    render(
      <ACTypography variant="h1" noWrap>
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-noWrap");
  });

  test("renders h1 with paragraph prop and checks if it has AC-Typography-paragraph className", () => {
    render(
      <ACTypography variant="h1" paragraph>
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1")).toHaveClass("AC-Typography-paragraph");
  });

  test("renders h1 with style prop and checks if inline styles are applied", () => {
    render(
      <ACTypography
        variant="h1"
        style={{ color: "red", backgroundColor: "orange" }}
      >
        h1
      </ACTypography>
    );
    const styles = getComputedStyle(screen.getByText("h1"));
    expect(styles.color).toBe("red");
    expect(styles.backgroundColor).toBe("orange");
  });

  test("renders h1 with component prop and checks if it has change html tag to match the prop", () => {
    render(
      <ACTypography variant="h1" component="span">
        h1
      </ACTypography>
    );
    expect(screen.getByText("h1").tagName).toEqual("SPAN");
  });

  test("renders text using children prop", () => {
    render(<ACTypography variant="h1" children="lorem"></ACTypography>);
    expect(screen.getByText("lorem")).toHaveTextContent("lorem");
  });

  test("renders default Typography component", () => {
    render(<ACTypography>lorem</ACTypography>);
    expect(screen.getByText("lorem")).toHaveTextContent("lorem");
  });
});
