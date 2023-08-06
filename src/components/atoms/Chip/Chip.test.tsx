import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Chip from "./Chip";
import { MdMusicNote } from "react-icons/md";

describe("ACChip", () => {
  it("renders the default Chip component", () => {
    render(<Chip label="Label" />);

    expect(screen.getByTestId("Chip")).toBeInTheDocument();
  });

  it("tests if left icon is rendered", () => {
    render(<Chip label="Label" leftIcon={<MdMusicNote />} />);

    expect(screen.getByTestId("Chip").children[0]).toHaveClass("Chip-leftIcon");
  });

  it("tests if right icon is rendered", () => {
    render(<Chip label="Label" rightIcon={<MdMusicNote />} />);

    expect(screen.getByTestId("ACChip").children[1]).toHaveClass(
      "Chip-rightIcon"
    );
  });

  it("tests if chip is disabled", () => {
    render(<Chip label="Label" disabled />);

    expect(screen.getByTestId("ACChip")).toHaveClass("Chip-disabled");
  });
});
