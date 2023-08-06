import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ACChip from "./ACChip";
import { MdMusicNote } from "react-icons/md";

describe("ACChip", () => {
  it("renders the default ACChip component", () => {
    render(<ACChip label="Label" />);

    expect(screen.getByTestId("ACChip")).toBeInTheDocument();
  });

  it("tests if left icon is rendered", () => {
    render(<ACChip label="Label" leftIcon={<MdMusicNote />} />);

    expect(screen.getByTestId("ACChip").children[0]).toHaveClass(
      "ACChip-leftIcon"
    );
  });

  it("tests if right icon is rendered", () => {
    render(<ACChip label="Label" rightIcon={<MdMusicNote />} />);

    expect(screen.getByTestId("ACChip").children[1]).toHaveClass(
      "ACChip-rightIcon"
    );
  });

  it("tests if chip is disabled", () => {
    render(<ACChip label="Label" disabled />);

    expect(screen.getByTestId("ACChip")).toHaveClass("ACChip-disabled");
  });
});
