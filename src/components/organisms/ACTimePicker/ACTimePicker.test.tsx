import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACTimePicker from "./ACTimePicker";

describe("ACTimePicker", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};
  const onChange = jest.fn();
  //clear render after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render ACTimePicker", () => {
    render(<ACTimePicker onChange={onChange} />);
    const timePickerWrap = screen.getByRole("timePickerWrap");
    expect(timePickerWrap).toBeInTheDocument();
  });
  it("onClick addon-after time picker (minute and hours) selector should displaying ", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeIcon = screen.getByRole("timeIcon");
    await userEvent.click(timeIcon);
    const hourSelectWrap = screen.getByRole("hourSelectorWrap");
    const hourSelector = screen.getAllByRole("digitalHourSelect");
    const minuteSelectWrap = screen.getByRole("minuteSelectorWrap");
    const minuteSelector = screen.getAllByRole("digitalMinuteSelect");
    expect(hourSelectWrap).toBeInTheDocument();
    expect(hourSelector).toHaveLength(48);
    expect(minuteSelectWrap).toBeInTheDocument();
    expect(minuteSelector).toHaveLength(120);
  });
  it("on select date input value should be change and onChange function should be called", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    const timeIcon = screen.getByRole("timeIcon");
    await userEvent.click(timeIcon);
    const hourSelector = screen.getAllByRole("digitalHourSelect");
    const minuteSelector = screen.getAllByRole("digitalMinuteSelect");
    await userEvent.click(hourSelector[1]);
    await userEvent.click(minuteSelector[1]);
    expect(timeInput).toHaveValue("01:01");
    expect(onChange).toBeCalled();
  });
  it("on type letter ,input value should not be change and error message should be displayed", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    await userEvent.type(timeInput, "aaaaa");
    expect(timeInput).toHaveValue("");
  });
  it("if hour entered correctly, should automatically add : on string", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    await userEvent.type(timeInput, "0101");

    expect(timeInput).toHaveValue("01:01");
  });
  it("if input string is correct, should automatically add 00 on minute", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    await userEvent.type(timeInput, "013");
    timeInput.focus();
    userEvent.tab();

    expect(timeInput).toHaveValue("01:03");
  });
  it("if entered invalid minutes error message should be displayed", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    await userEvent.type(timeInput, "0199");
  });
  it("it type invalid time on blur error message should be displayed and value should be empty", async () => {
    render(<ACTimePicker onChange={onChange} />);
    const timeInput = screen.getByTestId("TimePicker__input");
    await userEvent.type(timeInput, "12");
    timeInput.focus();
    userEvent.tab();
    expect(timeInput).toHaveValue("");
  });
});
