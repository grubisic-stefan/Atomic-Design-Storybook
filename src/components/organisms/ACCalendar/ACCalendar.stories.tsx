import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ACCalendar from "./ACCalendar";
export default {
  title: "Organisms/ACCalendar",
  component: ACCalendar,
} as ComponentMeta<typeof ACCalendar>;

const Template: ComponentStory<typeof ACCalendar> = (args) => (
  <ACCalendar {...args} />
);

const range = [
  {
    days: [16, 17, 22, 24, 25, 26, 27],
    style: { backgroundColor: "red", color: "white" },
    year: 2023,
    month: 3,
    disabled: true,
  },
  {
    days: [1, 2, 3],
    style: { backgroundColor: "green", color: "white" },
    year: 2023,
    month: 2,
  },
  {
    days: [1, 2, 3],
    style: { backgroundColor: "#ffa500", color: "white" },
    year: 2023,
    month: 1,
  },
];

const disableWeekDaysDummy = [
  { day: 0, style: { backgroundColor: "pink", color: "white" } },
  { day: 6, style: { backgroundColor: "pink", color: "white" } },
];

export const calendar = Template.bind({});
calendar.args = {
  dateFormat: "DD.MM.YYYY",
  startDate: new Date("2021-01-01"),
  endDate: new Date("2024-12-31"),
};
export const calendarDefaultValue = Template.bind({});
calendarDefaultValue.args = {
  defaultDate: new Date(),
};
export const markRange = Template.bind({});
markRange.args = {
  markRange: range,
  onBlur: (e) => console.log(e),
  onChange: (e, date) => console.log(e, date),
};
export const disableWeekDay = Template.bind({});
disableWeekDay.args = {
  defaultDate: new Date(),
  disableWeekDays: disableWeekDaysDummy,
};
export const timePicker = Template.bind({});
timePicker.args = {
  timePicker: true,
  defaultDate: new Date(),
  digitalClock: true,
};
