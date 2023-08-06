import React, { CSSProperties, ReactElement } from "react";
import { StyledCard } from "./styled/Card";

export type CardProps = {
  headerChildren?: ReactElement;
  bodyChildren?: ReactElement;
  footerChildren?: ReactElement;
  hoverable?: boolean;
  bodyClass?: string;
  headerClass?: string;
  footerClass?: string;
  dataTestiId?: string;
  style?: {
    wrapper?: CSSProperties;
    headerWrapper?: CSSProperties;
    bodyWrapper?: CSSProperties;
    footerWrapper?: CSSProperties;
  };
  className?: string;
  onClick?: () => void;
};

const Card = ({
  headerChildren,
  bodyChildren,
  footerChildren,
  hoverable = false,
  bodyClass = "",
  headerClass = "",
  footerClass = "",
  dataTestiId = "",
  className = "",
  onClick = () => "",
  style,
}: CardProps) => {
  return (
    <StyledCard
      className={`Card ${hoverable && "hoverable"} ${className}`}
      data-testid={`${dataTestiId}-Card-Wrapper`}
      style={style?.wrapper}
      onClick={() => onClick()}
    >
      {headerChildren && (
        <div
          style={style?.headerWrapper}
          className={`Card__Header ${headerClass}`}
          data-testid={`${dataTestiId}-Card-Header`}
        >
          {headerChildren}
        </div>
      )}
      {bodyChildren && (
        <div
          style={style?.bodyWrapper}
          className={`Card__Body ${bodyClass}`}
          data-testid={`${dataTestiId}-Card-Body`}
        >
          {bodyChildren}
        </div>
      )}
      {footerChildren && (
        <div
          style={style?.footerWrapper}
          className={`Card__Footer ${footerClass}`}
          data-testid={`${dataTestiId}-Card-Footer`}
        >
          {footerChildren}
        </div>
      )}
    </StyledCard>
  );
};

export default Card;
