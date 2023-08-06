import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Avatar from "../../Avatar";
import AvatarStatus from "./AvatarStatus";

describe("Avatar Status", () => {
  it("initial rendering", () => {
    render(
      <AvatarStatus status="active">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );
    const statusRoot = screen.getByTestId("Avatar__status-root");
    const statusDot = screen.getByTestId("Avatar__status-dot");
    expect(statusRoot).toBeInTheDocument();
    expect(statusDot).toBeInTheDocument();
  });
  it("test status active", () => {
    render(
      <AvatarStatus status="active">
        <Avatar size={"sm"}>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#55df55");
  });
  it("test status afk", () => {
    render(
      <AvatarStatus status="afk">
        <Avatar size="lg">UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#ffca00");
  });
  it("test status dnd", () => {
    render(
      <AvatarStatus status="dnd">
        <Avatar size="md">UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#fb2a5f");
  });
  it("test status off", () => {
    render(
      <AvatarStatus status="off">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("background-color:#aaaaaa");
  });
  it("test status none", () => {
    render(
      <AvatarStatus status="none">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("display:none");
  });
  it("test status dot position tl", () => {
    render(
      <AvatarStatus position="tl" status="off">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("left: 10%; top: 10%;");
  });
  it("test status dot position tr", () => {
    render(
      <AvatarStatus position="tr" status="off">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("right: 10%; top: 10%;");
  });
  it("test status dot position bl", () => {
    render(
      <AvatarStatus position="bl" status="off">
        <Avatar>UK</Avatar>
      </AvatarStatus>
    );

    const statusDot = screen.getByTestId("Avatar__status-dot");

    expect(statusDot).toHaveStyle("left: 10%; bottom: 10%;");
  });
});
