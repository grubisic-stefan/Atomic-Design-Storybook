import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import ACStepper from "./ACStepper";

const DUMMY_DATA = [
  {
    label: "Novi Sad",
    content: "Novi Sad",
  },
  {
    label: "Zmajevo",
    content: "Zmajevo City",
  },
  {
    label: "Subotica",
    content: "Zmajevo",
  },
];
describe("ACStepper", () => {
  it("should render ACStepper", () => {
    render(<ACStepper content={DUMMY_DATA} currentStep={0} />);
    const stepper = screen.getByRole("ACStepper");
    expect(stepper).toBeInTheDocument();
  });
  it("should render ACStepper with currentStep", () => {
    render(<ACStepper content={DUMMY_DATA} currentStep={1} />);
    const steps = screen.getAllByRole("ACStepDot");
    expect(steps[0]).toHaveClass("ACStep__heading-step-dot--done");
    expect(steps[1]).toHaveClass("ACStep__heading-step-dot--active");
    expect(steps[2]).toHaveClass("ACStep__heading-step-dot--todo");
    expect(screen.getByText("Zmajevo City")).toBeInTheDocument();
  });
  test("check header line on index 0", () => {
    render(<ACStepper content={DUMMY_DATA} currentStep={0} />);
    const line = screen.getAllByRole("ACStepLine");
    expect(line[0]).toHaveClass("ACStepper__heading-line--todo");
    expect(line[1]).toHaveClass("ACStepper__heading-line--todo");
  });
  test("check header line on index 1", () => {
    render(<ACStepper content={DUMMY_DATA} currentStep={1} />);
    const line = screen.getAllByRole("ACStepLine");
    expect(line[0]).toHaveClass("ACStepper__heading-line--done");
    expect(line[1]).toHaveClass("ACStepper__heading-line--todo");
  });
  test("check header line on index 2", () => {
    render(<ACStepper content={DUMMY_DATA} currentStep={2} />);
    const line = screen.getAllByRole("ACStepLine");
    expect(line[0]).toHaveClass("ACStepper__heading-line--done");
    expect(line[1]).toHaveClass("ACStepper__heading-line--done");
  });
  test("check next button", async () => {
    render(
      <ACStepper footerActions={true} content={DUMMY_DATA} currentStep={0} />
    );
    const nextButton = screen.getByRole("ACStepperNextButton");
    userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText("Zmajevo City")).toBeInTheDocument();
    });
  });
  test("check is next button disabled on last step", async () => {
    render(
      <ACStepper footerActions={true} content={DUMMY_DATA} currentStep={2} />
    );
    const nextButton = screen.getByRole("ACStepperNextButton");
    expect(nextButton).toBeDisabled();
  });
  test("check if prev button disabled on first step", async () => {
    render(
      <ACStepper footerActions={true} content={DUMMY_DATA} currentStep={0} />
    );
    const prevButton = screen.getByRole("ACStepperPrevButton");
    expect(prevButton).toBeDisabled();
  });

  test("check prev button", async () => {
    render(
      <ACStepper footerActions={true} content={DUMMY_DATA} currentStep={2} />
    );
    const prevButton = screen.getByRole("ACStepperPrevButton");
    userEvent.click(prevButton);
    await waitFor(() => {
      expect(screen.getByText("Zmajevo City")).toBeInTheDocument();
    });
  });

  test("if pass prop labelPosition='bottom' should render label on bottom", async () => {
    render(
      <ACStepper content={DUMMY_DATA} currentStep={0} labelPosition="bottom" />
    );
    const label = screen.getAllByRole("ACHeadingStep")[0];
    expect(label).toHaveClass("ACStepper__heading-step-label--bottom");
  });
  test("if pass prop labelPosition='top' should render label on top", async () => {
    render(
      <ACStepper content={DUMMY_DATA} currentStep={0} labelPosition="top" />
    );
    const label = screen.getAllByRole("ACHeadingStep")[0];
    expect(label).toHaveClass("ACStepper__heading-step-label--top");
  });
  test("if pass prop labelPosition='left' should render label on left", async () => {
    render(
      <ACStepper content={DUMMY_DATA} currentStep={0} labelPosition="left" />
    );
    const label = screen.getAllByRole("ACHeadingStep")[0];
    expect(label).toHaveClass("ACStepper__heading-step-label--left");
  });
  test("if pass prop labelPosition='right' should render label on right", async () => {
    render(
      <ACStepper content={DUMMY_DATA} currentStep={0} labelPosition="right" />
    );
    const label = screen.getAllByRole("ACHeadingStep")[0];
    expect(label).toHaveClass("ACStepper__heading-step-label--right");
  });
  test("if footerActions is false should not render buttons", async () => {
    render(
      <ACStepper content={DUMMY_DATA} currentStep={0} footerActions={false} />
    );
    const buttons = screen.queryByRole("ACStepperNextButton");
    expect(buttons).not.toBeInTheDocument();
  });
});
