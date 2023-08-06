import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACDigitalMinutesPicker from "./ACDigitalMinutesPicker";

describe("ACDigitalMinutesPicker", () => {
  const minuteSelect = jest.fn();

  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};

  it("should render wrapper and steps", () => {
    render(<ACDigitalMinutesPicker minuteSelect={minuteSelect} />);
    expect(screen.getByRole("minuteSelectorWrap")).toBeInTheDocument();
    expect(screen.getAllByRole("digitalMinuteSelect")).toHaveLength(120);
  });
  it("should call minuteSelect on click", () => {
    render(<ACDigitalMinutesPicker minuteSelect={minuteSelect} />);
    const minuteSelectStep = screen.getAllByRole("digitalMinuteSelect")[0];
    userEvent.click(minuteSelectStep);
    expect(minuteSelect).toHaveBeenCalled();
  });

  it("infinit scroll should work", () => {
    render(<ACDigitalMinutesPicker minuteSelect={minuteSelect} />);
    const minuteSelector = screen.getByRole("minuteSelectorWrap");
    fireEvent.scroll(minuteSelector, { target: { scrollTop: 2000 } });
  });
  it("chek default value", () => {
    render(<ACDigitalMinutesPicker MM={1} minuteSelect={minuteSelect} />);
    const minuteSelectStep = screen.getAllByRole("digitalMinuteSelect")[1];
    expect(minuteSelectStep).toHaveStyle("color: #fff");
  });
  it("chek default value", () => {
    render(<ACDigitalMinutesPicker MM={58} minuteSelect={minuteSelect} />);
    const minuteSelectStep = screen.getAllByRole("digitalMinuteSelect")[58];
    expect(minuteSelectStep).toHaveStyle("color: #fff");
  });
});
