import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Card from "./Card";
import BasicBody from "./components/BasicCard/BasicBody";
import BasicFooter from "./components/BasicCard/BasicFooter";
import BasicHeader from "./components/BasicCard/BasicHeader";
import ImageBody from "./components/ImageCard/ImageBody";
import ImageFooter from "./components/ImageCard/ImageFooter";
import ImageHeader from "./components/ImageCard/ImageHeader";

export default {
  title: "molecules/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const ImageTemplate: ComponentStory<typeof Card> = (args) => {
  return (
    <Card
      style={{
        wrapper: {
          width: "100%",
          height: "100%",
          maxWidth: "370px",
          minWidth: "300px",
        },
      }}
      hoverable
      headerChildren={<ImageHeader />}
      bodyChildren={<ImageBody />}
      footerChildren={<ImageFooter />}
    />
  );
};

export const Image = ImageTemplate.bind({});

const BasicTemplate: ComponentStory<typeof Card> = (args) => {
  return (
    <Card
      style={{
        wrapper: {
          width: "100%",
          height: "100%",
          maxWidth: "5000px",
          minWidth: "300px",
        },
      }}
      headerChildren={<BasicHeader />}
      bodyChildren={<BasicBody />}
      footerChildren={<BasicFooter />}
    />
  );
};

export const Basic = BasicTemplate.bind({});

const NoContentTemplate: ComponentStory<typeof Card> = (args) => {
  return (
    <Card
      style={{
        wrapper: {
          width: "100%",
          height: "100%",
          maxWidth: "5000px",
          minWidth: "300px",
        },
      }}
      headerChildren={<BasicHeader />}
      onClick={() => alert("Alert")}
      hoverable
    />
  );
};

export const NoContent = NoContentTemplate.bind({});
