import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import ACToolTip from "./ACToolTip";

describe("AVATAR", () => {
  it("initial reneder", () => {
    render(
      <ACToolTip label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const RootACToolTip = screen.getByTestId("toolTipRoot");
    const ACToolTipLabel = screen.getByTestId("toolTipLabel");
    const DUMMYCONTENT = screen.getByTestId("dummyContent");

    expect(RootACToolTip).toBeInTheDocument();
    expect(ACToolTipLabel).toBeInTheDocument();
    expect(DUMMYCONTENT).toBeInTheDocument();
  });

  it("Test style props", () => {
    render(
      <ACToolTip style={{ color: "red" }} label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle("color:red");
  });

  it("Test label position tl", () => {
    render(
      <ACToolTip position="topLeft" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    screen.debug();
    expect(ACToolTipLabel).toHaveStyle(
      "bottom:100% ; transform: translateY(-10px)"
    );
  });

  it("Test label position tc", () => {
    render(
      <ACToolTip position="topCenter" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "bottom:100% ; transform: translate(-50% , -10px); left:50%"
    );
  });

  it("Test label position tr", () => {
    render(
      <ACToolTip position="topRight" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "bottom:100% ; transform: translateY(-10px); right:0"
    );
  });

  it("Test label position lt", () => {
    render(
      <ACToolTip position="leftTop" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:0 ; transform: translateX(-10px); right:100%"
    );
  });

  it("Test label position lb", () => {
    render(
      <ACToolTip position="leftBottom" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "bottom:0 ; transform: translateX(-10px); right:100%"
    );
  });

  it("Test label position lc", () => {
    render(
      <ACToolTip position="leftCenter" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:50% ; transform: translate(-10px , -50%); right:100%"
    );
  });

  it("Test label position bl", () => {
    render(
      <ACToolTip position="bottomLeft" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:100% ; transform: translateY(10px); left:0"
    );
  });

  it("Test label position br", () => {
    render(
      <ACToolTip position="bottomRight" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:100% ; transform: translateY(10px); right:0"
    );
  });

  it("Test label position bc", () => {
    render(
      <ACToolTip position="bottomCenter" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:100% ;transform:translate(-50% , 10px); left:50%"
    );
  });

  it("Test label position rt", () => {
    render(
      <ACToolTip position="rightTop" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:0 ; transform:translateX(10px); left:100%"
    );
  });

  it("Test label position rb", () => {
    render(
      <ACToolTip position="rightBottom" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "bottom:0 ; transform:translateX(10px); left:100%"
    );
  });

  it("Test label position rc", () => {
    render(
      <ACToolTip position="rightCenter" label="label">
        <p
          data-testid="dummyContent"
          style={{
            backgroundColor: "silver",
            display: "block",
            padding: "20px",
          }}
        >
          ToolTip
        </p>
      </ACToolTip>
    );

    const ACToolTipLabel = screen.getByTestId("toolTipLabel");

    expect(ACToolTipLabel).toHaveStyle(
      "top:50% ; transform:translate(10px , -50%); left:100%"
    );
  });
});
