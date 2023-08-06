import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import Avatar from "./Avatar";

const img = require("./assets/imgs/p2.jpg");

describe("AVATAR", () => {
  it("initial reneder single avatar", () => {
    render(<Avatar bgColor="#FFF">NP</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    const ACAvatarLetter = screen.getByTestId("avatar__letter");
    expect(RootAvatar).toBeInTheDocument();
    expect(ACAvatarLetter).toBeInTheDocument();
  });
  it("testing avatar size sm", () => {
    render(<Avatar size="sm">UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("width: 30px; height: 30px;");
  });
  it("testing avatar size md", () => {
    render(<Avatar size="md">UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("width: 40px; height: 40px;");
  });
  it("testing avatar size lg", () => {
    render(<Avatar size="lg">UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("width: 50px; height: 50px;");
  });
  it("testing avatar size custom", () => {
    render(<Avatar size={{ width: 80, height: 80 }}>UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("width: 80px; height: 80px;");
  });
  it("testing type square", () => {
    render(<Avatar type="square">UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 4px;");
  });
  it("testing type circle ", () => {
    render(<Avatar type="circle">UK</Avatar>);
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 50%;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded="sm">
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 4px;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded="md">
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 8px;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded="lg">
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 16px;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded="full">
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 100%;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded="0">
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: none;");
  });
  it("testing rounded  ", () => {
    render(
      <Avatar type="square" rounded={50}>
        UK
      </Avatar>
    );
    const RootAvatar = screen.getByTestId("avatar__root");
    expect(RootAvatar).toHaveStyle("border-radius: 50px;");
  });
  it("testing img using imgUrl", () => {
    render(<Avatar imgUrl="./assets/imgs/p2.jpg" type="square" rounded={50} />);
    const img = screen.getByAltText("UserImg");
    expect(img).toBeInTheDocument();
  });
  it("testing img using imported img", () => {
    render(<Avatar img={img} type="square" rounded={50} />);
    const imgImporteds = screen.getByAltText("UserImg");
    expect(imgImporteds).toBeInTheDocument();
  });
  it("testing default avatar", () => {
    render(<Avatar type="square" rounded={50} />);
    const imgImporteds = screen.getByText("AC");
    expect(imgImporteds).toBeInTheDocument();
  });
});
