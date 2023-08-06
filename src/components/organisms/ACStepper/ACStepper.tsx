import React, { Fragment, useCallback, useLayoutEffect } from "react";

import ACStepLine from "./ACStepLine/ACStepLine";
import ACStepDot from "./ACStepDot/ACStepDot";

import { ACStepperPropsT } from "./Types";

import "./ACStepper.scss";

const ACStepper = ({
  footerActions = false,
  content,
  labelPosition = "bottom",
  currentStep,
  style,
  headingLineClassNames,
  onDotClick,
}: ACStepperPropsT) => {
  const [currentStepState, setCurrentStepState] = React.useState(0);

  useLayoutEffect(() => {
    if (currentStep || currentStep === 0) {
      if (currentStep > content.length - 1)
        return setCurrentStepState(content.length - 1);
      if (currentStep < 0) return setCurrentStepState(0);
      setCurrentStepState(currentStep);
    }
  }, [currentStep]);

  const nextButtonHandler = () => {
    if (currentStepState < content.length - 1)
      setCurrentStepState((prev) => prev + 1);
  };

  const prevButtonHandler = () => {
    if (currentStepState > 0) setCurrentStepState((prev) => prev - 1);
  };

  const dotClickHandler = useCallback((index: number) => {
    onDotClick && onDotClick(index);
  }, []);

  return (
    <div role="ACStepper" style={style?.wrapper} className="ACStepper__wrapper">
      <div style={style?.heading} className="ACStepper__heading">
        {content.map((step, index) => (
          <Fragment key={index}>
            <ACStepDot
              index={index}
              label={step.label}
              stepDot={step.stepDot}
              currentStep={currentStepState}
              labelPosition={labelPosition}
              style={style}
              onClick={onDotClick && dotClickHandler}
            />
            <ACStepLine
              currentStep={currentStepState}
              key={index + 80}
              index={index}
              content={content}
              labelPosition={labelPosition}
              style={style}
              headingLineClassNames={headingLineClassNames}
            />
          </Fragment>
        ))}
      </div>

      <div style={style?.contentWrap} className="ACStepper__content">
        {content.map((step, index) => {
          if (index === currentStepState) return step.content;
          return null;
        })}

        {footerActions && (
          <div style={style?.footer} className="ACStepper__footer">
            <button
              disabled={currentStepState === 0}
              style={style?.prevButton}
              role="ACStepperPrevButton"
              onClick={prevButtonHandler}
            >
              Prev
            </button>
            <button
              disabled={currentStepState === content.length - 1}
              style={style?.nextButton}
              role="ACStepperNextButton"
              onClick={nextButtonHandler}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ACStepper;
