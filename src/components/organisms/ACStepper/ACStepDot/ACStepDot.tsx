import React from "react";

import { ACStepDotT } from "../Types";

const ACStepDot = ({
  label,
  stepDot,
  index,
  currentStep,
  labelPosition,
  style,
  onClick,
}: ACStepDotT) => {
  const labelPositionClass = `ACStepper__heading-step-label--${labelPosition}`;

  const stepStatus = () => {
    if (index < currentStep) return "ACStep__heading-step-dot--done";
    if (index === currentStep) return "ACStep__heading-step-dot--active";
    return "ACStep__heading-step-dot--todo";
  };

  return (
    <div
      style={style?.headingStep}
      className={`ACStepper__heading-step ${labelPositionClass}`}
      role="ACHeadingStep"
      onClick={() => {
        onClick && onClick(index);
      }}
    >
      {stepDot ? (
        stepDot
      ) : (
        <div
          style={style?.dot}
          className={`ACStepper__heading-step-dot ${stepStatus()} `}
          role="ACStepDot"
        >
          {index + 1}
        </div>
      )}
      {label && (
        <div style={style?.label} className="ACStepper__heading-step-label">
          {label}
        </div>
      )}
    </div>
  );
};

export default ACStepDot;
