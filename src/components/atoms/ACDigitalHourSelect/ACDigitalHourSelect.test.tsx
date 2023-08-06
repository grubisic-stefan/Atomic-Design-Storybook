import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACDigitalHourSelect from "./ACDigitalHourSelect";

describe("ACDigitalHourSelect", () => {
  const hourSelect = jest.fn();

  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};

  it("should render wrapper and steps", () => {
    render(<ACDigitalHourSelect hourSelect={hourSelect} />);
    expect(screen.getByRole("hourSelectorWrap")).toBeInTheDocument();
    expect(screen.getAllByRole("digitalHourSelect")).toHaveLength(48);
  });
  it("should call hourSelect on click", () => {
    render(<ACDigitalHourSelect hourSelect={hourSelect} />);
    const hourSelectStep = screen.getAllByRole("digitalHourSelect")[0];
    userEvent.click(hourSelectStep);
    expect(hourSelect).toHaveBeenCalled();
  });

  it("infinit scroll should work", () => {
    render(<ACDigitalHourSelect hourSelect={hourSelect} />);
    const hourSelector = screen.getByRole("hourSelectorWrap");
    fireEvent.scroll(hourSelector, { target: { scrollTop: 2000 } });
  });
  it("chek default value", () => {
    render(<ACDigitalHourSelect HH={1} hourSelect={hourSelect} />);
    const hourSelectStep = screen.getAllByRole("digitalHourSelect")[1];
    expect(hourSelectStep).toHaveStyle("color: #fff");
  });
  it("chek default value", () => {
    render(<ACDigitalHourSelect HH={23} hourSelect={hourSelect} />);
    const hourSelectStep = screen.getAllByRole("digitalHourSelect")[23];
    expect(hourSelectStep).toHaveStyle("color: #fff");
  });
});
