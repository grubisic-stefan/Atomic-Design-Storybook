import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import ACTimeLine from "./ACTimeLine";

const DUMMY_DATA = {
  DUMMY_DATA_RIGHT: [
    {
      labelRight: "Meeting",
    },
    {
      labelRight: "Client Meeting",
    },
    {
      labelRight: "Daily Reports",
    },
  ],
  DUMMY_DATA_LEFT: [
    {
      labelLeft: "HR Meeting",
    },
    {
      labelLeft: "Daily Meeting",
    },
    {
      labelLeft: "Reports",
    },
  ],
  DUMMY_DATA_BOTH: [
    {
      labelLeft: "07:00",
      labelRight: "HR Meeting",
    },
    {
      labelRight: "Daily Meeting",
    },
    {
      labelLeft: "14:00",
      labelRight: "Reports",
    },
  ],
  DUMMY_DATA_COMPONENTS: [
    {
      labelLeftRender: <div>08:00</div>,
      labelRightRender: <div>HR Meeting</div>,
      dotRender: <div>Dot</div>,
    },
    {
      labelLeftRender: <div>12:00</div>,
      labelRightRender: <div>Daily Meeting</div>,
      dotRender: <div>Dot</div>,
    },
    {
      labelLeftRender: <div>14:00</div>,
      labelRightRender: <div>Reports</div>,
      dotRender: <div>Dot</div>,
    },
  ],
};

describe("ACTimeLine", () => {
  it("should render ACTimeLine", () => {
    render(<ACTimeLine sides="right" content={DUMMY_DATA.DUMMY_DATA_RIGHT} />);
    const timeline = screen.getByRole("ACTimeLine");
    expect(timeline).toBeInTheDocument();
  });
  it("should render ACTimeLine with current no of step", () => {
    render(<ACTimeLine sides="right" content={DUMMY_DATA.DUMMY_DATA_RIGHT} />);
    const steps = screen.getAllByRole("ACTimePoint");
    expect(steps.length).toBe(3);
  });
  it("should render ACTimeLine with current side of label", () => {
    render(<ACTimeLine sides="right" content={DUMMY_DATA.DUMMY_DATA_RIGHT} />);
    const label = screen.getAllByRole("ACTimeLineLabel");
    expect(label[0]).toHaveClass("ACTimeLine__right-label");
    expect(label[1]).toHaveClass("ACTimeLine__right-label");
    expect(label[2]).toHaveClass("ACTimeLine__right-label");
  });
  it("should render ACTimeLine with current side of label", () => {
    render(<ACTimeLine sides="left" content={DUMMY_DATA.DUMMY_DATA_LEFT} />);
    const label = screen.getAllByRole("ACTimeLineLabel");
    expect(label[0]).toHaveClass("ACTimeLine__left-label");
    expect(label[1]).toHaveClass("ACTimeLine__left-label");
    expect(label[2]).toHaveClass("ACTimeLine__left-label");
  });
  it("if render both side without one left label, this left label should render empty whit role ACTimeLineLabelEmpty ", () => {
    render(<ACTimeLine sides="both" content={DUMMY_DATA.DUMMY_DATA_BOTH} />);
    const label = screen.getAllByRole("ACTimeLineLabelEmpty");
    expect(label.length).toBe(1);
  });
  it("check if render correct no of line", () => {
    render(<ACTimeLine sides="both" content={DUMMY_DATA.DUMMY_DATA_BOTH} />);
    const line = screen.getAllByRole("ACTimeLineLine");
    expect(line.length).toBe(2);
  });
  it("check if components for dot, components should be render", () => {
    render(
      <ACTimeLine sides="both" content={DUMMY_DATA.DUMMY_DATA_COMPONENTS} />
    );
    const dot = screen.getAllByText("Dot");
    expect(dot.length).toBe(3);
  });

  it("check if components for label, components should be render", () => {
    render(
      <ACTimeLine sides="both" content={DUMMY_DATA.DUMMY_DATA_COMPONENTS} />
    );
    const label = screen.getAllByText("HR Meeting");
    expect(label.length).toBe(1);
  });
});
