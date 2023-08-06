import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACAppBar from "./ACAppBar";
import ACMenuBtn from "../../atoms/ACMenuBtn/ACMenuBtn";

describe("AVATAR", () => {
  it("initial reneder appBar and nebnu Btn", () => {
    render(
      <ACAppBar>
        <ACMenuBtn></ACMenuBtn>
      </ACAppBar>
    );
    const ACAppBarRoot = screen.getByTestId("ACAppbarRoot");
    const ACMenuBtnRoot = screen.getByTestId("ACMenuBtnRoot");
    const ACMenuBtnLine1 = screen.getByTestId("ACMenuBtnline1");
    const ACMenuBtnLine2 = screen.getByTestId("ACMenuBtnline2");
    const ACMenuBtnLine3 = screen.getByTestId("ACMenuBtnline3");

    expect(ACAppBarRoot).toBeInTheDocument();
    expect(ACMenuBtnRoot).toBeInTheDocument();
    expect(ACMenuBtnLine1).toBeInTheDocument();
    expect(ACMenuBtnLine2).toBeInTheDocument();
    expect(ACMenuBtnLine3).toBeInTheDocument();
  });

  it("Style appBar", () => {
    render(
      <ACAppBar style={{ display: "flex" }}>
        <ACMenuBtn></ACMenuBtn>
      </ACAppBar>
    );
    const ACAppBarRoot = screen.getByTestId("ACAppbarRoot");

    expect(ACAppBarRoot).toHaveStyle("display:flex");
  });

  it("check if menu btn change to x on click", () => {
    render(
      <ACAppBar style={{ display: "flex" }}>
        <ACMenuBtn></ACMenuBtn>
      </ACAppBar>
    );

    const ACMenuBtnRoot = screen.getByTestId("ACMenuBtnRoot");
    const ACMenuBtnLine1 = screen.getByTestId("ACMenuBtnline1");
    const ACMenuBtnLine2 = screen.getByTestId("ACMenuBtnline2");
    const ACMenuBtnLine3 = screen.getByTestId("ACMenuBtnline3");

    userEvent.click(ACMenuBtnRoot);

    expect(ACMenuBtnLine1).toHaveClass("ACMenuOpen");
    expect(ACMenuBtnLine2).toHaveClass("ACMenuOpen");
    expect(ACMenuBtnLine3).toHaveClass("ACMenuOpen");
  });
  it("check if menu btn change from x on flat", () => {
    render(
      <ACAppBar style={{ display: "flex" }}>
        <ACMenuBtn></ACMenuBtn>
      </ACAppBar>
    );

    const ACMenuBtnRoot = screen.getByTestId("ACMenuBtnRoot");
    const ACMenuBtnLine1 = screen.getByTestId("ACMenuBtnline1");
    const ACMenuBtnLine2 = screen.getByTestId("ACMenuBtnline2");
    const ACMenuBtnLine3 = screen.getByTestId("ACMenuBtnline3");

    userEvent.click(ACMenuBtnRoot);
    userEvent.click(ACMenuBtnRoot);

    expect(ACMenuBtnLine1).not.toHaveClass("ACMenuOpen");
    expect(ACMenuBtnLine2).not.toHaveClass("ACMenuOpen");
    expect(ACMenuBtnLine3).not.toHaveClass("ACMenuOpen");
  });
});
