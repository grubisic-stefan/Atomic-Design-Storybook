export type StepT = {
  label?: string;
  stepDot?: any;
  content?: any;
};

export type ACStepperPropsT = {
  content: StepT[];
  labelPosition?: "top" | "bottom" | "left" | "right";
  footerActions?: boolean;
  currentStep: number | false;
  style?: ACStepStyle;
  headingLineClassNames?: string;
  onDotClick?: (index: number) => void;
};

export type ACStepLineT = {
  index: number;
  content: StepT[];
  currentStep: number | false | string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  style?: ACStepStyle;
  headingLineClassNames?: string;
};

export type ACStepDotT = {
  label?: string;
  stepDot?: any;
  index: number;
  currentStep: number;
  labelPosition?: "top" | "bottom" | "left" | "right";
  style?: ACStepStyle;
  onClick?: (index: number) => void;
};

export type ACStepStyle = {
  wrapper?: React.CSSProperties;
  heading?: React.CSSProperties;
  contentWrap?: React.CSSProperties;
  footer?: React.CSSProperties;
  prevButton?: React.CSSProperties;
  nextButton?: React.CSSProperties;
  headingLine?: React.CSSProperties;
  headingStep?: React.CSSProperties;
  dot?: React.CSSProperties;
  label?: React.CSSProperties;
};
