import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACSnackbar from "./ACSnackbar";

describe("ACSnackbar", () => {
  it("renders the default ACSnackbar component", () => {
    render(<ACSnackbar open={true} text="Tekst" onClose={() => {}} />);
    expect(screen.getByTestId("ACSnackbar")).toBeInTheDocument();
  });

  it("tests if snackbar is not visible", () => {
    render(<ACSnackbar open={false} onClose={() => {}} text="Tekst" />);

    expect(screen.queryByTestId("ACSnackbar")).not.toBeInTheDocument();
  });

  it("tests if snackbar disapears after set time", async () => {
    let open = true;
    const handleClose = jest.fn();
    render(
      <ACSnackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={1000}
        text="Tekst"
      />
    );

    await waitFor(
      () => {
        expect(handleClose).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });
});
