import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import AvatarGroup from "./AvatarGroup";
import Avatar from "../../Avatar";

describe("AVATAR GROUP", () => {
  it("initial rendering", () => {
    render(
      <AvatarGroup>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
      </AvatarGroup>
    );
    const groupRoot = screen.getByTestId("avatar__group-root");
    const rootACAvatar = screen.getAllByTestId("avatar__root");
    expect(groupRoot).toBeInTheDocument();
    expect(rootACAvatar).toHaveLength(3);
  });
  it("testing max No of avatar, length of avatar is 4 bcs show more-less btn", () => {
    render(
      <AvatarGroup max={3}>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
      </AvatarGroup>
    );

    const rootACAvatar = screen.getAllByTestId("avatar__root");
    expect(rootACAvatar).toHaveLength(4);
  });
  it("testing show mor & showLess btn", () => {
    render(
      <AvatarGroup max={3}>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
        <Avatar>UK</Avatar>
      </AvatarGroup>
    );

    const showMore = screen.getAllByTestId("avatar__root")[3];
    userEvent.click(showMore);
    const rootACAvatarShow = screen.getAllByTestId("avatar__root");
    expect(rootACAvatarShow).toHaveLength(7);
    userEvent.click(showMore);
    const rootACAvatarLess = screen.getAllByTestId("avatar__root");
    expect(rootACAvatarLess).toHaveLength(4);
  });
});
