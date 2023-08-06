import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ACAvatar from "./ACAvatar";

import ACAvatarStatus from "./Components/ACAvatarStatus/ACAvatarStatus";
import ACAvatarGroup from "./Components/ACAvatarGroup/ACAvatarGroup";
//@ts-ignore:next-line
import img from "./assets/imgs/p2.jpg";

export default {
  title: "Atoms/ACAvatar",
  component: ACAvatar,
  subComponents: { ACAvatarGroup, ACAvatarStatus },
} as ComponentMeta<typeof ACAvatar>;

const Template: ComponentStory<typeof ACAvatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Type:img</h3>
    <ACAvatar {...args} imgUrl="./assets/imgs/p2.jpg" />
    <h3 style={{ margin: "20px 0" }}>Type:Letter</h3>
    <ACAvatar {...args} imgUrl="./assets/imgs/p2.jpg">
      UK
    </ACAvatar>
  </>
);
const TemplateSize: ComponentStory<typeof ACAvatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Size: sm</h3>
    <ACAvatar size="sm" img={img} />

    <h3 style={{ margin: "20px 0" }}>Size: md</h3>
    <ACAvatar size="md" img={img} />
    <h3 style={{ margin: "20px 0" }}>Size:lg</h3>
    <ACAvatar size="lg" img={img} />
    <h3 style={{ margin: "20px 0" }}>Size: custom</h3>
    <ACAvatar size={{ width: 80, height: 80 }} imgUrl="./assets/imgs/p2.jpg" />
  </>
);
const TemplateType: ComponentStory<typeof ACAvatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Type: circle</h3>
    <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />

    <h3 style={{ margin: "20px 0" }}>Type: square</h3>
    <ACAvatar size="md" type="square" imgUrl="./assets/imgs/p2.jpg" />
    <h3 style={{ margin: "20px 0" }}>Type: square & rounded: md</h3>

    <ACAvatar
      rounded="md"
      size="md"
      type="square"
      imgUrl="./assets/imgs/p2.jpg"
    />
  </>
);
const TemplateGroup: ComponentStory<typeof ACAvatarGroup> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>All Avatar</h3>
    <ACAvatarGroup {...args}>
      <ACAvatar hoverEffect={true} size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar hoverEffect={true} size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar hoverEffect={true} size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarGroup>
    <h3 style={{ margin: "20px 0" }}>Max No Avatar</h3>
    <ACAvatarGroup max={3} {...args}>
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarGroup>
    <h3 style={{ margin: "20px 0" }}>
      Collapse & collapseBorder & collapseColor
    </h3>
    <ACAvatarGroup
      collapse={-18}
      collapseBorder={2}
      collapseColor="#a2288e"
      max={3}
      {...args}
    >
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarGroup>
  </>
);
const TemplateStatus: ComponentStory<typeof ACAvatarGroup> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Status Active</h3>
    <ACAvatarStatus status="active">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status AFK</h3>
    <ACAvatarStatus status="afk">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status DND</h3>
    <ACAvatarStatus status="dnd">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status OFF</h3>
    <ACAvatarStatus status="off">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status NONE</h3>
    <ACAvatarStatus status="none">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status position tr</h3>
    <ACAvatarStatus position="tr" status="active">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status tl</h3>
    <ACAvatarStatus position="tl" status="dnd">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status br</h3>
    <ACAvatarStatus position="br" status="off">
      <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
    </ACAvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Group whit status</h3>
    <ACAvatarGroup max={3} {...args}>
      <ACAvatarStatus status="afk">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
      <ACAvatarStatus status="active">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
      <ACAvatarStatus status="afk">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
      <ACAvatarStatus status="active">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
      <ACAvatarStatus status="afk">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
      <ACAvatarStatus status="active">
        <ACAvatar size="md" imgUrl="./assets/imgs/p2.jpg" />
      </ACAvatarStatus>
    </ACAvatarGroup>
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
export const Size = TemplateSize.bind({});
Size.args = {
  size: "md",
};
export const Type = TemplateType.bind({});
Type.args = {};
export const Group = TemplateGroup.bind({});
Group.args = {};
export const Status = TemplateStatus.bind({});
Status.args = {};
