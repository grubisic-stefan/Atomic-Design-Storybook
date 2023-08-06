import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ACAvatar from "../../ACAvatar";
import ACAvatarStatus from "./ACAvatarStatus";

describe("Avatar Status", () => {
  it("initial rendering", () => {
    render(
      <ACAvatarStatus status="active">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );
    const statusRoot = screen.getByTestId("ACAvatar__status-root");
    const statusDot = screen.getByTestId("ACAvatar__status-dot");
    expect(statusRoot).toBeInTheDocument();
    expect(statusDot).toBeInTheDocument();
  });
  it("test status active", () => {
    render(
      <ACAvatarStatus status="active">
        <ACAvatar size={"sm"}>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#55df55");
  });
  it("test status afk", () => {
    render(
      <ACAvatarStatus status="afk">
        <ACAvatar size="lg">UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#ffca00");
  });
  it("test status dnd", () => {
    render(
      <ACAvatarStatus status="dnd">
        <ACAvatar size="md">UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#fb2a5f");
  });
  it("test status off", () => {
    render(
      <ACAvatarStatus status="off">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#aaaaaa");
  });
  it("test status none", () => {
    render(
      <ACAvatarStatus status="none">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("display:none");
  });
  it("test status dot position tl", () => {
    render(
      <ACAvatarStatus position="tl" status="off">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("left: 10%; top: 10%;");
  });
  it("test status dot position tr", () => {
    render(
      <ACAvatarStatus position="tr" status="off">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("right: 10%; top: 10%;");
  });
  it("test status dot position bl", () => {
    render(
      <ACAvatarStatus position="bl" status="off">
        <ACAvatar>UK</ACAvatar>
      </ACAvatarStatus>
    );

    const statusDot = screen.getByTestId("ACAvatar__status-dot");

    expect(statusDot).toHaveStyle("left: 10%; bottom: 10%;");
  });
});
