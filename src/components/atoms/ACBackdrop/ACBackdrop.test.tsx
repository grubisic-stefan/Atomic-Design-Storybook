import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACBackdrop from "./ACBackdrop";

describe("BACKDROP", () => {
  it("initial render ", () => {
    render(<ACBackdrop />);

    const ACBackdropRoot = screen.getByTestId("ACBackdropRoot");

    expect(ACBackdropRoot).toBeInTheDocument();
  });
  it("test if on esc  call onClose fnc ", () => {
    const handleOnClose = jest.fn();

    render(<ACBackdrop onClose={handleOnClose} />);

    userEvent.keyboard("{Escape}");

    expect(handleOnClose).toHaveBeenCalled();
  });
});
