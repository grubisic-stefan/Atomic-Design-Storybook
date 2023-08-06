import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACTimeLine from "./ACTimeLine";
import { ACAvatar } from "../../atoms";

export default {
  title: "Organisms/ACTimeLine",
  component: ACTimeLine,
} as ComponentMeta<typeof ACTimeLine>;

const DUMMY_DATA_RIGHT = [
  {
    labelRight: "HR Meeting",
  },
  {
    labelRight: "Daily Meeting",
  },
  {
    labelRight: "Reports",
  },
];
const DUMMY_DATA_LEFT = [
  {
    labelLeft: "HR Meeting",
  },
  {
    labelLeft: "Daily Meeting",
  },
  {
    labelLeft: "Reports",
  },
];
const DUMMY_DATA_BOTH = [
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
];
const DUMMY_DATA_COMPONENTS = [
  {
    labelLeftRender: <div>08:00</div>,
    labelRightRender: <div>HR Meeting</div>,
    dotRender: (
      <ACAvatar type="square" bgColor="#ff0089">
        UK
      </ACAvatar>
    ),
  },
  {
    labelLeftRender: <div>12:00</div>,
    labelRightRender: <div>Daily Meeting</div>,
    dotRender: (
      <ACAvatar type="square" bgColor="#ff0089">
        UK
      </ACAvatar>
    ),
  },
  {
    labelLeftRender: <div>14:00</div>,
    labelRightRender: <div>Reports</div>,
    dotRender: (
      <ACAvatar type="square" bgColor="#ff0089">
        UK
      </ACAvatar>
    ),
  },
];

const Template: ComponentStory<typeof ACTimeLine> = (args) => (
  <div style={{ height: "500px" }}>
    <ACTimeLine {...args} />
  </div>
);

export const TimelineRight = Template.bind({});
TimelineRight.args = {
  content: DUMMY_DATA_RIGHT,
  sides: "right",
};
export const TimelineLeft = Template.bind({});
TimelineLeft.args = {
  content: DUMMY_DATA_LEFT,
  sides: "left",
};
export const TimelineBothSide = Template.bind({});
TimelineBothSide.args = {
  content: DUMMY_DATA_BOTH,
  sides: "both",
};
export const TimelineStyle = Template.bind({});
TimelineStyle.args = {
  content: DUMMY_DATA_BOTH,
  sides: "both",
  style: {
    dot: {
      backgroundColor: "#FFF",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "5px solid #35937e",
    },
    line: {
      backgroundColor: "#35937e",
      width: "5px",
      borderRadius: "5px",
    },
    labelLeftWrapper: {
      color: "#35937e",
    },
    labelRightWrapper: {
      color: "#d226b2",
      width: "200px",
    },
  },
};

export const TimelineRenderComponents = Template.bind({});
TimelineRenderComponents.args = {
  content: DUMMY_DATA_COMPONENTS,
  sides: "both",
};
