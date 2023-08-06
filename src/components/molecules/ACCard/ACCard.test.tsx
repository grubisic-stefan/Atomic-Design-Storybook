import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ACCard from "./ACCard";

const TestingACCard = (props: any): any => (
  <ACCard
    headerChildren={<p>Header</p>}
    bodyChildren={<p>Body</p>}
    footerChildren={<p>Footer</p>}
    {...props}
  />
);

describe("ACCard", () => {
  const props = {
    header: "Header",
    body: "Body",
    footer: "Footer",
    dataTestId: /AC-Card-Wrapper/,
    dataTestIdHeader: /AC-Card-Header/,
    dataTestIdBody: /AC-Card-Body/,
    dataTestIdFooter: /AC-Card-Footer/,
    className: "Header-Class",
    style: {
      height: "100%",
      width: "400%",
      maxWidth: "1000px",
      maxHeight: "400px",
      minWidth: "300px",
      minHeight: "200px",
    },
  };

  it("Should render ACCard", () => {
    render(TestingACCard({}));
    const card = screen.getByTestId(props.dataTestId);
    expect(card).toBeInTheDocument();
  });

  it("Should render header children", () => {
    render(TestingACCard({}));
    const header = screen.getByText(props.header);
    expect(header).toBeInTheDocument();
  });

  it("Should render body children", () => {
    render(TestingACCard({}));
    const body = screen.getByText(props.body);
    expect(body).toBeInTheDocument();
  });

  it("Should render footer children", () => {
    render(TestingACCard({}));
    const footer = screen.getByText(props.footer);
    expect(footer).toBeInTheDocument();
  });

  it("Should have class hoverable", () => {
    render(TestingACCard({ hoverable: true }));
    const card = screen.getByTestId(props.dataTestId);
    expect(card).toHaveClass("hoverable");
  });

  it("Header should have class that is passed as a prop", () => {
    render(TestingACCard({ className: props.className }));
    const header = screen.getByTestId(props.dataTestId);
    expect(header).toHaveClass(props.className);
  });

  it("Wrapper should have style that is passed as a prop", () => {
    const style = {
      wrapper: props.style,
    };
    render(TestingACCard({ style: style }));
    const card = screen.getByTestId(props.dataTestId);
    expect(card).toHaveStyle(style.wrapper);
  });

  it("Header should have style that is passed as a prop", () => {
    const style = {
      headerWrapper: props.style,
    };
    render(TestingACCard({ style: style }));
    const card = screen.getByTestId(props.dataTestIdHeader);
    expect(card).toHaveStyle(style.headerWrapper);
  });
  it("Body should have style that is passed as a prop", () => {
    const style = {
      bodyWrapper: props.style,
    };
    render(TestingACCard({ style: style }));
    const card = screen.getByTestId(props.dataTestIdBody);
    expect(card).toHaveStyle(style.bodyWrapper);
  });
  it("Footer should have style that is passed as a prop", () => {
    const style = {
      footerWrapper: props.style,
    };
    render(TestingACCard({ style: style }));
    const card = screen.getByTestId(props.dataTestIdFooter);
    expect(card).toHaveStyle(style.footerWrapper);
  });
});
