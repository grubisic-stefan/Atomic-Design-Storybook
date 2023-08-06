import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import ACAvatarGroup from "./ACAvatarGroup";
import ACAvatar from "../../ACAvatar";

describe("AVATAR GROUP", () => {
  it("initial rendering", () => {
    render(
      <ACAvatarGroup>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
      </ACAvatarGroup>
    );
    const groupRoot = screen.getByTestId("avatar__group-root");
    const rootACAvatar = screen.getAllByTestId("avatar__root");
    expect(groupRoot).toBeInTheDocument();
    expect(rootACAvatar).toHaveLength(3);
  });
  it("testing max No of avatar, length of avatar is 4 bcs show more-less btn", () => {
    render(
      <ACAvatarGroup max={3}>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
      </ACAvatarGroup>
    );

    const rootACAvatar = screen.getAllByTestId("avatar__root");
    expect(rootACAvatar).toHaveLength(4);
  });
  it("testing show mor & showLess btn", () => {
    render(
      <ACAvatarGroup max={3}>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
      </ACAvatarGroup>
    );

    const showMore = screen.getAllByTestId("avatar__root")[3];
    userEvent.click(showMore);
    const rootACAvatarShow = screen.getAllByTestId("avatar__root");
    expect(rootACAvatarShow).toHaveLength(7);
    userEvent.click(showMore);
    const rootACAvatarLess = screen.getAllByTestId("avatar__root");
    expect(rootACAvatarLess).toHaveLength(4);
  });
  it("testing collaps config", () => {
    render(
      <ACAvatarGroup collapse={2} collapseBorder={2} collapseColor="#FFF">
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
        <ACAvatar>UK</ACAvatar>
      </ACAvatarGroup>
    );

    const Avatar = screen.getAllByTestId("avatar__root")[1];
    expect(Avatar).toHaveStyle("margin-left: 2px; border: 2px solid #fff;");
  });
});
