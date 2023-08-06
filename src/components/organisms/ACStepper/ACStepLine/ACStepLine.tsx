import React from "react";
import { ACStepLineT } from "../Types";

const ACStepLine = ({
  index,
  content,
  currentStep,
  labelPosition,
  headingLineClassNames,
  style,
}: ACStepLineT) => {
  const labelPositionClass = `ACStepper__heading-line--${labelPosition} `;
  const stepStatus =
    index < currentStep
      ? "ACStepper__heading-line--done"
      : "ACStepper__heading-line--todo";
  if (index < content.length - 1)
    return (
      <div
        style={style?.headingLine}
        className={`ACStepper__heading-line ${stepStatus} ${labelPositionClass} ${headingLineClassNames}`}
        role="ACStepLine"
      ></div>
    );
  return null;
};

export default ACStepLine;
