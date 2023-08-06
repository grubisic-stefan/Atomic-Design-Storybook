import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACModal from "./ACModal";

describe("ACModal", () => {
  it("initial render ", () => {
    render(
      <ACModal isShow={true} onClose={() => {}}>
        <div data-testid="modalContent"></div>
      </ACModal>
    );

    const ACBackdropRoot = screen.getByTestId("ACBackdropRoot");
    const modalContent = screen.getByTestId("modalContent");

    expect(ACBackdropRoot).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });
  it("Click On BackDrop  ", () => {
    const onClose = jest.fn();
    render(
      <ACModal isShow={true} onClose={onClose}>
        <div data-testid="modalContent"></div>
      </ACModal>
    );

    const ACBackdropRoot = screen.getByTestId("ACBackdropRoot");

    userEvent.click(ACBackdropRoot);
    expect(onClose).toHaveBeenCalled();
  });

  it("Test transition type from top", () => {
    render(
      <ACModal transition="fromTop" isShow={true} onClose={() => {}}>
        <div data-testid="modalContent"></div>
      </ACModal>
    );

    const ACTransitionRoot = screen.getByTestId("ACTransitionRoot");
    expect(ACTransitionRoot).toHaveClass("fromTopInStart");
  });
  it("Test transition type from bottom", () => {
    render(
      <ACModal transition="fromBottom" isShow={true} onClose={() => {}}>
        <div data-testid="modalContent"></div>
      </ACModal>
    );

    const ACTransitionRoot = screen.getByTestId("ACTransitionRoot");
    expect(ACTransitionRoot).toHaveClass("fromBottomInStart");
  });
});
