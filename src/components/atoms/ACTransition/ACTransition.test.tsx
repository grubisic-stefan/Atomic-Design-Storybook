import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import ACTransition from "./ACTransition";

const rerenderComp = () => {
  const { rerender } = render(
    <>
      <ACTransition
        isShow={true}
        inStart="inStart"
        inEnd="inEnd"
        outEnd="outEnd"
        outStart="outStart"
        time={800}
      >
        <div></div>
      </ACTransition>
    </>
  );
  rerender(
    <>
      <ACTransition
        isShow={false}
        inStart="inStart"
        inEnd="inEnd"
        outEnd="outEnd"
        outStart="outStart"
        time={800}
      >
        <div></div>
      </ACTransition>
    </>
  );
};

describe("Transition", () => {
  it(" test if element get inEnd class when render", async () => {
    render(
      <>
        <ACTransition
          isShow={true}
          inStart="inStart"
          inEnd="inEnd"
          outEnd="outEnd"
          outStart="outStart"
          time={800}
        >
          <div></div>
        </ACTransition>
      </>
    );
    await waitFor(() => {
      expect(screen.getByTestId("ACTransitionRoot")).toHaveClass("inEnd");
    });
  });
  it(" test if element during unmounting get first outStart class and immediately after that get outEndClass", async () => {
    rerenderComp();

    expect(screen.getByTestId("ACTransitionRoot")).toHaveClass("outStart");

    await waitFor(() => {
      expect(screen.getByTestId("ACTransitionRoot")).toHaveClass("outEnd");
    });
  });
  it("test if element when change state to show, during unmounting, get class inEnd and cancel unmounting", async () => {
    const { rerender } = render(
      <>
        <ACTransition
          isShow={true}
          inStart="inStart"
          inEnd="inEnd"
          outEnd="outEnd"
          outStart="outStart"
          time={800}
        >
          <div></div>
        </ACTransition>
      </>
    );
    rerender(
      <>
        <ACTransition
          isShow={false}
          inStart="inStart"
          inEnd="inEnd"
          outEnd="outEnd"
          outStart="outStart"
          time={800}
        >
          <div></div>
        </ACTransition>
      </>
    );
    rerender(
      <>
        <ACTransition
          isShow={true}
          inStart="inStart"
          inEnd="inEnd"
          outEnd="outEnd"
          outStart="outStart"
          time={800}
        >
          <div></div>
        </ACTransition>
      </>
    );
    expect(screen.getByTestId("ACTransitionRoot")).toHaveClass("inEnd");
  });
  it("test if element unmounted", async () => {
    rerenderComp();
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("ACTransitionRoot")
    );
  });
});
