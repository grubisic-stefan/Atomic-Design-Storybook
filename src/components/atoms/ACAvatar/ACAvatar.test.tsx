import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import ACAvatar from "./ACAvatar";

const img = require("./assets/imgs/p2.jpg");

describe("AVATAR", () => {
  it("initial reneder single avatar", () => {
    render(<ACAvatar bgColor="#FFF">NP</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    const ACAvatarLetter = screen.getByTestId("avatar__letter");
    expect(RootACAvatar).toBeInTheDocument();
    expect(ACAvatarLetter).toBeInTheDocument();
  });
  it("testing avatar size sm", () => {
    render(<ACAvatar size="sm">UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("width: 30px; height: 30px;");
  });
  it("testing avatar size md", () => {
    render(<ACAvatar size="md">UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("width: 40px; height: 40px;");
  });
  it("testing avatar size lg", () => {
    render(<ACAvatar size="lg">UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("width: 50px; height: 50px;");
  });
  it("testing avatar size custom", () => {
    render(<ACAvatar size={{ width: 80, height: 80 }}>UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("width: 80px; height: 80px;");
  });
  it("testing type square", () => {
    render(<ACAvatar type="square">UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 4px;");
  });
  it("testing type circle ", () => {
    render(<ACAvatar type="circle">UK</ACAvatar>);
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 50%;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded="sm">
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 4px;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded="md">
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 8px;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded="lg">
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 16px;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded="full">
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 100%;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded="0">
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: none;");
  });
  it("testing rounded  ", () => {
    render(
      <ACAvatar type="square" rounded={50}>
        UK
      </ACAvatar>
    );
    const RootACAvatar = screen.getByTestId("avatar__root");
    expect(RootACAvatar).toHaveStyle("border-radius: 50px;");
  });
  it("testing img using imgUrl", () => {
    render(
      <ACAvatar imgUrl="./assets/imgs/p2.jpg" type="square" rounded={50} />
    );
    const img = screen.getByAltText("UserImg");
    expect(img).toBeInTheDocument();
  });
  it("testing img using imported img", () => {
    render(<ACAvatar img={img} type="square" rounded={50} />);
    const imgImporteds = screen.getByAltText("UserImg");
    expect(imgImporteds).toBeInTheDocument();
  });
  it("testing default avatar", () => {
    render(<ACAvatar type="square" rounded={50} />);
    const imgImporteds = screen.getByText("AC");
    expect(imgImporteds).toBeInTheDocument();
  });
});
