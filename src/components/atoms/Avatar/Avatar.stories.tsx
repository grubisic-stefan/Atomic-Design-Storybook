import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Avatar from "./Avatar";

import AvatarStatus from "./Components/AvatarStatus/AvatarStatus";
import AvatarGroup from "./Components/AvatarGroup/AvatarGroup";
//@ts-ignore:next-line
import img from "./assets/imgs/p2.jpg";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  subComponents: { AvatarGroup, AvatarStatus },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Type:img</h3>
    <Avatar {...args} img={img} />
    <h3 style={{ margin: "20px 0" }}>Type:Letter</h3>
    <Avatar {...args} img={img}>
      UK
    </Avatar>
  </>
);
const TemplateSize: ComponentStory<typeof Avatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Size: sm</h3>
    <Avatar size="sm" img={img} />

    <h3 style={{ margin: "20px 0" }}>Size: md</h3>
    <Avatar size="md" img={img} />
    <h3 style={{ margin: "20px 0" }}>Size:lg</h3>
    <Avatar size="lg" img={img} />
    <h3 style={{ margin: "20px 0" }}>Size: custom</h3>
    <Avatar size={{ width: 80, height: 80 }} imgUrl="./assets/imgs/p2.jpg" />
  </>
);
const TemplateType: ComponentStory<typeof Avatar> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Type: circle</h3>
    <Avatar size="md" img={img} />

    <h3 style={{ margin: "20px 0" }}>Type: square</h3>
    <Avatar size="md" type="square" img={img} />
    <h3 style={{ margin: "20px 0" }}>Type: square & rounded: md</h3>

    <Avatar rounded="md" size="md" type="square" img={img} />
  </>
);
const TemplateGroup: ComponentStory<typeof AvatarGroup> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>All Avatar</h3>
    <AvatarGroup {...args}>
      <Avatar hoverEffect={true} size="md" img={img} />
      <Avatar hoverEffect={true} size="md" img={img} />
      <Avatar hoverEffect={true} size="md" img={img} />
    </AvatarGroup>
    <h3 style={{ margin: "20px 0" }}>Max No Avatar</h3>
    <AvatarGroup max={3} {...args}>
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
    </AvatarGroup>
    <h3 style={{ margin: "20px 0" }}>
      Collapse & collapseBorder & collapseColor
    </h3>
    <AvatarGroup
      collapse={-18}
      collapseBorder={2}
      collapseColor="#a2288e"
      max={3}
      {...args}
    >
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
      <Avatar size="md" img={img} />
    </AvatarGroup>
  </>
);
const TemplateStatus: ComponentStory<typeof AvatarGroup> = (args) => (
  <>
    <h3 style={{ margin: "20px 0" }}>Status Active</h3>
    <AvatarStatus status="active">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status AFK</h3>
    <AvatarStatus status="afk">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status DND</h3>
    <AvatarStatus status="dnd">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status OFF</h3>
    <AvatarStatus status="off">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status NONE</h3>
    <AvatarStatus status="none">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status position tr</h3>
    <AvatarStatus position="tr" status="active">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status tl</h3>
    <AvatarStatus position="tl" status="dnd">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Status br</h3>
    <AvatarStatus position="br" status="off">
      <Avatar size="md" img={img} />
    </AvatarStatus>
    <h3 style={{ margin: "20px 0" }}>Group whit status</h3>
    <AvatarGroup max={3} {...args}>
      <AvatarStatus status="afk">
        <Avatar size="md" img={img} />
      </AvatarStatus>
      <AvatarStatus status="active">
        <Avatar size="md" img={img} />
      </AvatarStatus>
      <AvatarStatus status="afk">
        <Avatar size="md" img={img} />
      </AvatarStatus>
      <AvatarStatus status="active">
        <Avatar size="md" img={img} />
      </AvatarStatus>
      <AvatarStatus status="afk">
        <Avatar size="md" img={img} />
      </AvatarStatus>
      <AvatarStatus status="active">
        <Avatar size="md" img={img} />
      </AvatarStatus>
    </AvatarGroup>
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
