import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ACCalendar from "./ACCalendar";

import { Month } from "./Constants";

const range = [
  {
    days: [2, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    style: { backgroundColor: "red", color: "white" },
    year: 2023,
    month: 3,
  },
];
const range1 = [
  {
    days: [2, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    style: { backgroundColor: "red", color: "white" },
    year: 2023,
    month: 3,
    disabled: true,
  },
];
const disableWeekDaysDummy = [
  { day: 0, style: { backgroundColor: "pink", color: "white" } },
  { day: 6, style: { backgroundColor: "pink", color: "white" } },
];
describe("ACCalendar", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.HTMLElement.prototype.scrollTo = function () {};
  it("renders the default ACCalendar component", () => {
    render(<ACCalendar />);

    expect(screen.getByRole("ACCalendar")).toBeInTheDocument();
  });

  it("onClick addon-after calendar should opening ", async () => {
    render(<ACCalendar />);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const ACCalendar__picker = screen.getByRole("ACCalendar__picker");
    expect(ACCalendar__picker).toHaveStyle("opacity:1");
  });

  it("onClick addon-after calendar should closing ", async () => {
    render(<ACCalendar />);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const ACCalendar__picker = screen.getByRole("ACCalendar__picker");
    expect(ACCalendar__picker).toHaveStyle("opacity:1");
    await userEvent.click(calendarIcon);
    expect(ACCalendar__picker).toHaveStyle("opacity:0");
  });
  it("on calendar render year and month should be current year and month", () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    render(<ACCalendar />);
    const calendarYear = screen.getByText(year);
    const calendarMonth = screen.getByText(Month[month]);
    expect(calendarYear).toBeInTheDocument();
    expect(calendarMonth).toBeInTheDocument();
  });
  it("on click next and prev month, month should be change", async () => {
    const date = new Date();

    const month = date.getMonth();
    render(<ACCalendar />);
    const calendarMonth = screen.getByText(Month[month]);
    const nextMonth = screen.getByRole("nextMonth");
    const prevMonth = screen.getByRole("prevMonth");
    await userEvent.click(nextMonth);
    expect(calendarMonth).toHaveTextContent(Month[month + 1]);
    await userEvent.click(prevMonth);
    expect(calendarMonth).toHaveTextContent(Month[month]);
  });
  it("on click on mount mountSelectPicker should be open", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const month = date.getMonth();
    const calendarMonth = screen.getByText(Month[month]);
    await userEvent.click(calendarMonth);
    const monthPicker = screen.getByRole("monthPicker");
    expect(monthPicker).toBeInTheDocument();
  });

  it("on click on month at monthSelectPicker should be change month", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const month = date.getMonth();
    let calendarMonth = screen.getByText(Month[month]);
    await userEvent.click(calendarMonth);
    const monthPicker = screen.getAllByRole("monthSelect")[0];
    await userEvent.click(monthPicker);
    calendarMonth = screen.getByText(Month[0]);
    expect(calendarMonth).toBeInTheDocument();
  });

  it("on Click on prev month day month should be change", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const month = date.getMonth();
    const calendarMonth = screen.getByText(Month[month]);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);

    const prevDay = screen.getAllByRole("prevDay")[0];
    await userEvent.click(prevDay);
    expect(calendarMonth).toHaveTextContent(Month[month - 1]);
  });

  it("on Click on next month day month should be change", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const month = date.getMonth();
    const calendarMonth = screen.getByText(Month[month]);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const nextDay = screen.getAllByRole("nextDay")[0];
    await userEvent.click(nextDay);
    expect(calendarMonth).toHaveTextContent(Month[month + 1]);
  });

  it("on click on year select year picker should be display", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const year = date.getFullYear();
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const calendarYear = screen.getByText(year);
    await userEvent.click(calendarYear);
    const yearPicker = screen.getByRole("yearPicker");
    expect(yearPicker).toBeInTheDocument();
  });

  it("on click on year at yearSelectPicker should be change year", async () => {
    render(<ACCalendar />);
    const date = new Date();
    const year = date.getFullYear();
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const calendarYear = screen.getByText(year);
    await userEvent.click(calendarYear);
    const yearPicker = screen.getAllByRole("yearSelect")[33];
    await userEvent.click(yearPicker);
    expect(calendarYear).toHaveTextContent("2023");
    await userEvent.click(calendarIcon);
    await userEvent.click(calendarYear);
    const yearPicker2 = screen.getAllByRole("yearSelect")[0];
    await userEvent.click(yearPicker2);
    expect(calendarYear).toHaveTextContent("1990");
  });

  it("on Click on day date should be change", async () => {
    render(
      <ACCalendar dateFormat="DD-MM-YYYY" defaultDate={new Date(2023, 3, 2)} />
    );
    const dataString = "02-04-2023";
    const defaultInput = screen.getByTestId("ACCalendar__input");
    expect(defaultInput).toHaveValue(dataString);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[0];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue("01-04-2023");
  });
  it("check if date is disabled if it is in i range", async () => {
    const range = [
      {
        days: [2, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        style: { backgroundColor: "red", color: "white" },
        year: 2023,
        month: 3,
        disabled: true,
      },
    ];
    render(
      <ACCalendar
        markRange={range}
        dateFormat="DD-MM-YYYY"
        defaultDate={new Date(2023, 2, 2)}
      />
    );
    const calendarIcon = screen.getByRole("calendarIcon");
    const defaultInput = screen.getByTestId("ACCalendar__input");
    const defaultString = "02-03-2023";
    expect(defaultInput).toHaveValue(defaultString);
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[20];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue(defaultString);
    await userEvent.click(calendarIcon);
    const day2 = screen.getAllByRole("day")[1];
    await userEvent.click(day2);
    expect(defaultInput).toHaveValue(defaultString);
  });
  it("check data range if it is not disabled", async () => {
    render(
      <ACCalendar
        markRange={range}
        dateFormat="DD-MM-YYYY"
        defaultDate={new Date(2023, 2, 2)}
      />
    );
    const calendarIcon = screen.getByRole("calendarIcon");
    const defaultInput = screen.getByTestId("ACCalendar__input");
    const defaultString = "02-03-2023";
    expect(defaultInput).toHaveValue(defaultString);
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[20];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue("21-03-2023");
    await userEvent.click(calendarIcon);
    expect(day).toHaveStyle("background-color: red");
  });
  it("check if date out of startDate and endDate is disabled", async () => {
    render(
      <ACCalendar
        dateFormat="DD-MM-YYYY"
        defaultDate={new Date(2023, 2, 8)}
        startDate={new Date(2023, 2, 2)}
        endDate={new Date(2023, 2, 10)}
      />
    );
    const calendarIcon = screen.getByRole("calendarIcon");
    const defaultInput = screen.getByTestId("ACCalendar__input");
    const defaultString = "08-03-2023";
    expect(defaultInput).toHaveValue(defaultString);
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[0];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue(defaultString);
    await userEvent.click(calendarIcon);
    const day2 = screen.getAllByRole("day")[20];
    await userEvent.click(day2);
    expect(defaultInput).toHaveValue(defaultString);
    const day3 = screen.getAllByRole("day")[7];
    await userEvent.click(day3);
    expect(defaultInput).toHaveValue("08-03-2023");
  });
  it("if calendar type data time, should be display time picker", async () => {
    render(<ACCalendar timePicker={true} />);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);

    const clockPicker = screen.getByRole("clockPicker");
    expect(clockPicker).toBeInTheDocument();
  });
  it("if calendar type data time, click on day, clock picker should be display, click on hour date should be change and clock should switch to minute select click on minutes date should be change and picker should be close  ", async () => {
    render(<ACCalendar defaultDate={new Date(2023, 3, 2)} timePicker={true} />);
    const defaultDate = "02-04-2023 00:00";
    const defaultInput = screen.getByTestId("ACCalendar__input");
    expect(defaultInput).toHaveValue(defaultDate);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[0];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue("01-04-2023 00:00");
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const clockPicker = screen.getByRole("clockPicker");
    expect(clockPicker).toBeInTheDocument();
    const hourBig = screen.getAllByRole("hourSelectBigNumber")[1];
    await userEvent.click(hourBig);
    expect(defaultInput).toHaveValue("01-04-2023 13:00");
    const minutesSelect = screen.getAllByRole("minutesSelect")[1];
    await userEvent.click(minutesSelect);
    expect(defaultInput).toHaveValue("01-04-2023 13:01");
  });

  it("on haver small number on hour select should be display bigHandle, on hover big number small handle should be display", async () => {
    render(<ACCalendar timePicker={true} />);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const hourSmall = screen.getAllByRole("hourSelectSmallNumber")[1];
    await userEvent.hover(hourSmall);
    const bigHandle = screen.getByRole("bigHandle");
    expect(bigHandle).toBeInTheDocument();
    const hourBig = screen.getAllByRole("hourSelectBigNumber")[1];
    await userEvent.hover(hourBig);
    const smallHandle = screen.getByRole("smallHandle");
    expect(smallHandle).toBeInTheDocument();

    await userEvent.unhover(hourBig);
    expect(smallHandle).not.toBeInTheDocument();

    await userEvent.unhover(hourSmall);
    expect(bigHandle).not.toBeInTheDocument();
    await userEvent.click(hourSmall);
  });

  it("if digital timer is true, should be display digital time picker", async () => {
    render(<ACCalendar timePicker={true} digitalClock={true} />);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const digitalClock = screen.getByRole("digitalTimePicker");
    expect(digitalClock).toBeInTheDocument();
  });
  it("if digital timer is true, click on day, clock picker should be display, click on hour or minute date should be change and picker not should be close  ", async () => {
    render(
      <ACCalendar
        defaultDate={new Date(2023, 3, 2)}
        timePicker={true}
        digitalClock={true}
      />
    );
    const defaultDate = "02-04-2023 00:00";
    const defaultInput = screen.getByTestId("ACCalendar__input");
    expect(defaultInput).toHaveValue(defaultDate);
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const day = screen.getAllByRole("day")[0];
    await userEvent.click(day);
    expect(defaultInput).toHaveValue("01-04-2023 00:00");
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const digitalClock = screen.getByRole("digitalTimePicker");
    expect(digitalClock).toBeInTheDocument();
    const hour = screen.getAllByRole("digitalHourSelect")[1];
    await userEvent.click(hour);
    expect(defaultInput).toHaveValue("01-04-2023 01:00");
    const minutes = screen.getAllByRole("digitalMinuteSelect")[1];
    await userEvent.click(minutes);
    expect(defaultInput).toHaveValue("01-04-2023 01:01");
  });

  it("check if date format format date in correct way", async () => {
    render(
      <ACCalendar
        timePicker={true}
        defaultDate={new Date(2023, 3, 2)}
        dateFormat="DD-MM-YYYY"
      />
    );
    const defaultInput = screen.getByTestId("ACCalendar__input");
    const defaultString = "02-04-2023 00:00";
    expect(defaultInput).toHaveValue(defaultString);
    render(
      <ACCalendar
        timePicker={true}
        defaultDate={new Date(2023, 3, 2)}
        dateFormat="MM.DD.YYYY"
      />
    );
    const defaultInput2 = screen.getAllByTestId("ACCalendar__input")[1];
    const defaultString2 = "04.02.2023 00:00";
    expect(defaultInput2).toHaveValue(defaultString2);
  });

  it("check if manual input, format date in correct way", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "030420230000");
    await userEvent.tab();
    expect(defaultInput).toHaveValue("03-04-2023 00:00");
  });

  it("on blur input, if input is not valid, should be display error", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "303020220000");
    await userEvent.tab();
    const error = screen.getByText("Invalid Date Format");
    expect(error).toBeInTheDocument();
  });
  it("on blur input, if input is empty, should not be display error", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");

    await userEvent.type(defaultInput, "");

    await userEvent.tab();
    const error = screen.queryByText("Invalid Date Format");
    expect(error).toBeInTheDocument();
  });

  it("on blur input, if input in disable mark range, should not be display error", async () => {
    render(
      <ACCalendar
        timePicker={true}
        dateFormat="DD-MM-YYYY"
        markRange={range1}
      />
    );
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "160320230000");
    await userEvent.tab();
    const error = screen.queryByText("This Date Is Disable");
    expect(error).toBeInTheDocument();
  });

  it("on blur input, if input out of range, should not be display error", async () => {
    render(
      <ACCalendar
        timePicker={true}
        dateFormat="DD-MM-YYYY"
        startDate={new Date(2023, 3, 2)}
      />
    );
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "010120230000");
    await userEvent.tab();
    const error = screen.queryByText("This Date Is Out Of Range");
    expect(error).toBeInTheDocument();
  });
  it("on blur input, if input hour is invalid, should not be display error", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "010120233000");
    await userEvent.tab();
    const error = screen.queryByText("Invalid time Format");
    expect(error).not.toBeInTheDocument();
  });
  it("on blur input, if input minute is correct, should not be display error", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "010120230060");
    await userEvent.tab();
    const error = screen.queryByText("Invalid time Format");
    expect(error).not.toBeInTheDocument();
  });
  it("on blur input, if input minute is invalid, should not be display error", async () => {
    render(<ACCalendar timePicker={true} dateFormat="DD-MM-YYYY" />);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    await userEvent.type(defaultInput, "0101202306");
    await userEvent.tab();
    const error = screen.queryByText("Invalid time Format");
    expect(error).not.toBeInTheDocument();
  });

  it("on reset button click, should be reset date to default date", async () => {
    render(
      <ACCalendar
        timePicker={true}
        dateFormat="YYYY-MM-DD"
        defaultDate={new Date(2023, 11, 2, 22, 22)}
        disableWeekDays={disableWeekDaysDummy}
      />
    );
    const defaultInput = screen.getByTestId("ACCalendar__input");
    expect(defaultInput).toHaveValue("2023-12-02 22:22");
    const calendarIcon = screen.getByRole("calendarIcon");
    await userEvent.click(calendarIcon);
    const resetButton = screen.getByRole("resetButton");
    await userEvent.click(resetButton);
    expect(defaultInput).toHaveValue("");
  });
  it("on digital hour scroll, should be infinite scroll", async () => {
    render(
      <ACCalendar
        defaultDate={new Date(11, 11, 2023, 1, 1)}
        timePicker={true}
        digitalClock={true}
      />
    );
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const digitalClock = screen.getByRole("digitalTimePicker");
    expect(digitalClock).toBeInTheDocument();
    const hour = screen.getByRole("hourSelectorWrap");
    //scroll hour element to 2000
    await fireEvent.scroll(hour, { target: { scrollY: -7000 } });
  });
  it("on digital minute scroll, should be infinite scroll", async () => {
    render(
      <ACCalendar
        defaultDate={new Date(11, 11, 2023, 22, 58)}
        timePicker={true}
        digitalClock={true}
      />
    );
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const digitalClock = screen.getByRole("digitalTimePicker");
    expect(digitalClock).toBeInTheDocument();
    const minute = screen.getByRole("minuteSelectorWrap");
    //scroll hour element to 2000
    await fireEvent.scroll(minute, { target: { scrollY: -7000 } });
  });
  it("on digital minute and hour click, should be change date", async () => {
    render(
      <ACCalendar
        defaultDate={new Date(2023, 11, 22, 22, 58)}
        timePicker={true}
        digitalClock={true}
      />
    );
    const clockIcon = screen.getByRole("clockIcon");
    await userEvent.click(clockIcon);
    const digitalClock = screen.getByRole("digitalTimePicker");
    expect(digitalClock).toBeInTheDocument();
    const hour = screen.getAllByRole("digitalHourSelect")[3];
    const minute = screen.getAllByRole("digitalMinuteSelect")[3];
    await userEvent.click(hour);
    await userEvent.click(minute);
    const defaultInput = screen.getByTestId("ACCalendar__input");
    expect(defaultInput).toHaveValue("22-12-2023 03:03");
  });
});
